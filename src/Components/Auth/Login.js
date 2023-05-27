import classes from "./Login.module.css";
import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCY-VGJzQO4PuIAWLAzUqOd4c2XvpMOQFs",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          const data = res.json();
          if (data.error.message) {
            alert(data.error.message);
          }
        }
      })
      .then((data) => {
        console.log(data);
        if (data.idToken) {
          console.log(data.idToken);
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", enteredEmail);
          navigate("/");
          console.log("Logged In Successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <div className={classes.container}>
      <div className={classes.formbox}>
        <form className={classes.form}>
          <span className={classes.title}>Log In</span>
          <div className={classes.formcontainer}>
            <input
              type="email"
              className={classes.input}
              placeholder="Email"
              required
              ref={emailInputRef}
            />
            <input
              type="password"
              className={classes.input}
              placeholder="Password"
              required
              ref={passwordInputRef}
            />
          </div>
          <NavLink
            activeClassName="active"
            className="link"
            to="/resetpassword"
          >
            <>Forgot password?</>
          </NavLink>
          <button onClick={loginHandler}>Log In</button>
        </form>
        <div className={classes.formsection}>
          <p>
            Don't have an account?{" "}
            <NavLink to="/signup">
              <>Sign up</>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
