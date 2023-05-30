import classes from "./EmailForm.module.css";
import React from "react";

const MailSent = ({ mail, onBack }) => {
  return (
    <div className={classes.mailCard}>
      <h4>{mail.subject}</h4>
      <p>To: {mail.to}</p>
      <p>{mail.message}</p>
      <button className={classes.backButton} onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default MailSent;
