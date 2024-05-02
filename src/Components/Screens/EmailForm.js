import { useRef, useEffect } from "react";
import classes from "./EmailForm.module.css";
import { getUsername } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../Store/ui-slice";
import Inbox from "./Inbox";
import Sent from "./Sent";
import Draft from "./Draft";

const EmailForm = () => {
  let username = localStorage.getItem("email") || " ";
  const user = getUsername(username);
  const showForm = useSelector((state) => state.ui.emailForm);
  const showInbox = useSelector((state) => state.ui.inboxShow);
  const showSent = useSelector((state) => state.ui.sentShow);
  const showDraft = useSelector((state) => state.ui.draftShow);
  const dispatch = useDispatch();
  const to = useRef();
  const subject = useRef();
  const message = useRef();

  useEffect(() => {
    dispatch(uiActions.openEmailForm());
  }, [dispatch]);

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
      `https://mail-box-client-93081-default-rtdb.firebaseio.com//${user}/sent/.json`,
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
      `https://mail-box-client-93081-default-rtdb.firebaseio.com//${userReceived}/received/.json`,
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
    dispatch(uiActions.closeSent());
    dispatch(uiActions.closeDraft());
  };

  const toggleInboxHandler = () => {
    dispatch(uiActions.openInbox());
    dispatch(uiActions.closeEmailForm());
    dispatch(uiActions.closeSent());
    dispatch(uiActions.closeDraft());
  };

  const toggleSentHandler = () => {
    dispatch(uiActions.openSent());
    dispatch(uiActions.closeInbox());
    dispatch(uiActions.closeEmailForm());
    dispatch(uiActions.closeDraft());
  };

  const toggleDraftHandler = () => {
    dispatch(uiActions.openDraft());
    dispatch(uiActions.closeEmailForm());
    dispatch(uiActions.closeInbox());
    dispatch(uiActions.closeSent());
  };

  const saveToDraftHandler = (event) => {
    event.preventDefault();

    const enteredTo = to.current.value;
    const enteredSubject = subject.current.value;
    const enteredMessage = message.current.value;

    const draftEmail = {
      to: enteredTo,
      subject: enteredSubject,
      message: enteredMessage,
      isDraft: true, // Indicate that this is a draft
    };

    // Save the draft email
    fetch(
      `https://mail-box-client-93081-default-rtdb.firebaseio.com/${user}/drafts/.json`,
      {
        method: "POST",
        body: JSON.stringify(draftEmail),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Email saved to Drafts:", data);
        alert("Email saved to Drafts");

        to.current.value = "";
        subject.current.value = "";
        message.current.value = "";
        // Fetch drafts after successfully saving a new draft
        fetchDrafts();
      })
      .catch((err) => {
        console.error("Error saving email to Drafts:", err);
        alert("Error saving email to Drafts");
      });
  };

  // Function to fetch draft emails from Firebase
  const fetchDrafts = () => {
    fetch(
      `https://mail-box-client-93081-default-rtdb.firebaseio.com/${user}/drafts/.json`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch drafts");
        }
        return res.json();
      })
      .then((data) => {
        // Process fetched draft emails
        // Here, you can update the state or perform any other action to display the draft emails
        console.log("Fetched drafts:", data);
      })
      .catch((err) => {
        console.error("Error fetching drafts:", err);
      });
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <button onClick={toggleEmailFormHandler}>Compose</button>
          <button onClick={toggleInboxHandler}>Inbox</button>
          <button onClick={toggleSentHandler}>Sent</button>
          <button onClick={toggleDraftHandler}>Draft</button>
        </div>
        {showForm && !showInbox && !showSent && !showDraft && (
          <>
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
              <button onClick={saveToDraftHandler}>Save to Draft</button>
            </form>
          </>
        )}
        {showInbox && !showForm && !showSent && !showDraft && <Inbox />}
        {showSent && !showInbox && !showForm && !showDraft && <Sent />}
        {showDraft && !showInbox && !showForm && !showSent && <Draft />}
      </div>
    </>
  );
};

export default EmailForm;
