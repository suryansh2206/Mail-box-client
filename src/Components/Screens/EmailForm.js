import { useRef } from "react";
import classes from "./EmailForm.module.css";
import { NavLink } from "react-router-dom";

const EmailForm = () => {
  let username = localStorage.getItem("email") || " ";
  let t = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === "." || username[i] === "@") {
      continue;
    } else {
      t += username[i];
    }
  }
  username = t;

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
      `https://react-http-a080a-default-rtdb.firebaseio.com/emails/${username}.json`,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <NavLink to="/" className={classes.navlink} activeClassName="active">
            <div>Compose</div>
          </NavLink>
          <NavLink to="/inbox" className={classes.navlink} activeClassName="active">
            <div>Inbox</div>
          </NavLink>
          <NavLink to="/sent" className={classes.navlink} activeClassName="active">
            <div>Sent</div>
          </NavLink>
        </div>
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
      </div>
    </>
  );
};

export default EmailForm;
