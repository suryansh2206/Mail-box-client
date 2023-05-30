import classes from "./EmailForm.module.css";
import React from "react";

const MailInbox = ({ mail, onBack }) => {
  return (
    <div className={classes.mailCard}>
      <h4>{mail.subject}</h4>
      <p>From: {mail.sender}</p>
      <p>{mail.message}</p>
      <button className={classes.backButton} onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default MailInbox;
