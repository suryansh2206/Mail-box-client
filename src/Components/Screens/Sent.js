import { useEffect, useState } from "react";
import classes from "./EmailForm.module.css";
import { getUsername } from "../../helper";
import MailSent from "./MailSent";

const Sent = () => {
  const username = localStorage.getItem("email") || " ";
  const user = getUsername(username);
  const [sentMail, setSentMail] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    fetch(
      `https://react-http-a080a-default-rtdb.firebaseio.com/${user}/sent/.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const mails = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setSentMail(mails);
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
          <MailSent mail={selectedMail} onBack={handleBack} />
        ) : (
          sentMail.map((mail) => (
            <div className={classes.card} key={mail.key}>
              <h4>{mail.subject}</h4>
              {/* <p>{mail.content}</p> */}
              <p>To: {mail.to}</p>
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

export default Sent;
