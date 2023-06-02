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
    // Fetch initial inbox data
    fetchInboxMail();

    // Set up interval for real-time updates
    const interval = setInterval(fetchInboxMail, 2000);

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchInboxMail = () => {
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
  };

  const openMailHandler = (mail) => {
    setSelectedMail(mail);
    markAsRead(mail.key); // Mark the selected mail as read
  };

  const markAsRead = (mailKey) => {
    // Update the 'read' property in the Firebase database for the specific email
    fetch(
      `https://mail-box-client-93081-default-rtdb.firebaseio.com/${user}/received/${mailKey}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          read: true,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const updatedInboxMail = inboxMail.map((mail) => {
          if (mail.key === mailKey) {
            return {
              ...mail,
              read: true, // Mark the email as read
            };
          }
          return mail;
        });
        setInboxMail(updatedInboxMail);
      })
      .catch((err) => {
        console.log(err);
      });
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

  // Calculate the count of unread mails
  const unreadMailCount = inboxMail.reduce(
    (count, mail) => (mail.read ? count : count + 1),
    0
  );

  return (
    <>
      <div className={classes.form}>
        <h3>Inbox {unreadMailCount > 0 && <span>({unreadMailCount})</span>}</h3>
        {selectedMail ? (
          <MailInbox mail={selectedMail} onBack={handleBack} />
        ) : (
          inboxMail.map((mail) => (
            <div
              className={`${classes.card} ${
                mail.read ? classes.read : classes.unread
              }`}
              key={mail.key}
            >
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
