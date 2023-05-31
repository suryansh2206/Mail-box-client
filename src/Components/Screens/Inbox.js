import { useEffect, useState } from "react";
import { getUsername } from "../../helper";
import classes from "./EmailForm.module.css";
import MailInbox from "./MailInbox";

const Inbox = () => {
  const [inboxMail, setInboxMail] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const username = localStorage.getItem("email") || " ";
  const user = getUsername(username);

  useEffect(() => {
    fetch(
      `https://mail-box-client-93081-default-rtdb.firebaseio.com/${user}/received/.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const mails = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setInboxMail(mails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openMailHandler = (mail) => {
    setSelectedMail(mail);
  };

  const handleBack = () => {
    setSelectedMail(null);
  };

  const deleteMailHandler = (mailKey) => {
    // Make a DELETE request to the API to delete the mail
    fetch(
      `https://mail-box-client-93081-default-rtdb.firebaseio.com/${user}/received/${mailKey}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Update the inboxMail state by removing the deleted mail
        const updatedInboxMail = inboxMail.filter(
          (mail) => mail.key !== mailKey
        );
        setInboxMail(updatedInboxMail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={classes.form}>
        {selectedMail ? (
          <MailInbox mail={selectedMail} onBack={handleBack} />
        ) : (
          inboxMail.map((mail) => (
            <div className={classes.card} key={mail.key}>
              <h4>{mail.subject}</h4>
              <p>From: {mail.sender}</p>
              <div className={classes.buttons}>
                <button onClick={() => openMailHandler(mail)}>Open</button>
                <button onClick={() => deleteMailHandler(mail.key)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Inbox;
