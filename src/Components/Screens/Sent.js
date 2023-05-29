import { useEffect, useState } from "react";
import classes from "./EmailForm.module.css";
import { getUsername } from "../../helper";

const Sent = () => {
  const username = localStorage.getItem("email") || " ";
  const user = getUsername(username);
  const [sentMail, setSentMail] = useState([]);

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

  return (
    <>
      <div className={classes.form}>
        {sentMail.map((mail) => (
          <div className={classes.card} key={mail.key}>
            <h4>{mail.subject}</h4>
            {/* <p>{mail.content}</p> */}
            <p>To: {mail.to}</p>
            {/* <div>Delete</div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Sent;
