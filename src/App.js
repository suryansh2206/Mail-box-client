import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./Components/Auth/SignUp";
import Login from "./Components/Auth/Login";
import HomePage from "./Components/Screens/HomePage";
import ResetPassword from "./Components/Auth/ResetPassword";

const App = () => {
  const isAuth = localStorage.getItem("token");
  return (
    <Routes>
      {<Route path="/signup" element={<SignUp />} />}
      {<Route path="/login" element={<Login />} />}
      {!isAuth ? (
        <Route path="/*" element={<Navigate to="/login" />} />
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
        </>
      )}
      <Route path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
