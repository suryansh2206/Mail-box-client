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
      `https://react-http-a080a-default-rtdb.firebaseio.com/${user}/received/.json`
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
                <button>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Inbox;
