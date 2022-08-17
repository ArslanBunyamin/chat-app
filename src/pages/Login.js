import React, { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword, setLoggedIn } from "./loginSlice";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const currentUser = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDb = collection(db, "Users");

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(setUsername(usernameRef.current.value));
    dispatch(setPassword(passwordRef.current.value));
    dispatch(setLoggedIn("false"));
  };

  useEffect(() => {
    const userCheck = query(
      userDb,
      where("username", "==", currentUser.username),
      where("password", "==", currentUser.password)
    );
    onSnapshot(userCheck, (snapshot) => {
      if (snapshot.docs.length === 1) {
        dispatch(setLoggedIn("true"));
        setLoggedIn("true");
        navigate("/Home");
      }
    });
  }, [currentUser]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginHandler}>
        <div className="login-header">Hoşgeldin!</div>
        <label>
          username:
          <input
            ref={usernameRef}
            type="search"
            className="login-input clearable"
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
        </label>
        <label>
          password:
          <input
            ref={passwordRef}
            type="search"
            className="login-input clearable"
            spellCheck="false"
            autoComplete="off"
          />
        </label>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
