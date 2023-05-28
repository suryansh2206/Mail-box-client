import { Fragment } from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import EmailForm from "./EmailForm";

const HomePage = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.left}>
          <div>Mailbox Client</div>
        </div>
        <div className={classes.right}>
          <button className={classes.welcome} onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </header>
      <EmailForm />
    </Fragment>
  );
};

export default HomePage;
