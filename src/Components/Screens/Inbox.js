import { useEffect, useState } from "react";
import { getUsername } from "../../helper";
import classes from "./EmailForm.module.css";

const Inbox = () => {
  const [inboxMail, setInboxMail] = useState([]);
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

  return (
    <div className={classes.form}>
      {inboxMail.map((mail) => (
        <div className={classes.card} key={mail.key}>
          <h3>{mail.subject}</h3>
          <p>{mail.content}</p>
          <p>From: {mail.sender}</p>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
