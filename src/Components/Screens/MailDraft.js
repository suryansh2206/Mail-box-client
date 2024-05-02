import classes from "./EmailForm.module.css";
import React from "react";

const MailDraft = ({ draft, onBack }) => {
  return (
    <div className={classes.mailCard}>
      <h4>{draft.subject}</h4>
      <p>To: {draft.to}</p>
      <p>{draft.message}</p>
      <button className={classes.backButton} onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default MailDraft;
