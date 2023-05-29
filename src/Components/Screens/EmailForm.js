import { useRef } from "react";
import classes from "./EmailForm.module.css";
import { getUsername } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../Store/ui-slice";
import { useNavigate } from "react-router-dom";
import Inbox from "./Inbox";

const EmailForm = () => {
  let username = localStorage.getItem("email") || " ";
  const user = getUsername(username);
  const navigate = useNavigate();
  const showForm = useSelector((state) => state.ui.emailForm);
  const showInbox = useSelector((state) => state.ui.inboxShow);
  const dispatch = useDispatch();
  const to = useRef();
  const subject = useRef();
  const message = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredto = to.current.value;
    const enteredSubject = subject.current.value;
    const enteredMessage = message.current.value;
    const email = {
      to: enteredto,
      subject: enteredSubject,
      message: enteredMessage,
    };
    fetch(
      `https://react-http-a080a-default-rtdb.firebaseio.com/${user}/sent/.json`,
      {
        method: "POST",
        body: JSON.stringify(email),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        } else return res.json();
      })
      .then((data) => {
        alert("Email Sent");
        console.log(data, "MESSAGE SENT");
        to.current.value = "";
        subject.current.value = "";
        message.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
    const userReceived = getUsername(enteredto);
    const received_mail = {
      receiver: userReceived,
      subject: enteredSubject,
      message: enteredMessage,
      sender: user,
      isOpen: false,
    };
    fetch(
      `https://react-http-a080a-default-rtdb.firebaseio.com/${userReceived}/received/.json`,
      {
        method: "POST",
        body: JSON.stringify(received_mail),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        } else return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleEmailFormHandler = () => {
    dispatch(uiActions.openEmailForm());
    dispatch(uiActions.closeInbox());
  };

  const toggleInboxHandler = () => {
    dispatch(uiActions.openInbox());
    dispatch(uiActions.closeEmailForm());
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <button onClick={toggleEmailFormHandler}>Compose</button>
          <button onClick={toggleInboxHandler}>Inbox</button>
          <button>Sent</button>
        </div>
        {showForm && !showInbox && (
          <form className={classes.form} onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="To:"
              className={classes.input}
              ref={to}
            />
            <input
              type="text"
              placeholder="Subject:"
              className={classes.input}
              ref={subject}
            />
            <textarea placeholder="Your message" ref={message}></textarea>
            <button>Send</button>
          </form>
        )}
        {showInbox && !showForm && <Inbox />}
      </div>
    </>
  );
};

export default EmailForm;
