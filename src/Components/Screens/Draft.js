import { useEffect, useState } from "react";
import classes from "./EmailForm.module.css";
import { getUsername } from "../../helper";

const Draft = () => {
  return (
    <>
      <div className={classes.form}>
        <h3>Draft</h3>
      </div>
    </>
  );
};

export default Draft;
