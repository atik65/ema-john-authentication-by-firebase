import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./login.css";
const Login = () => {
  const { handleSubmit, register } = useForm();
  const { goooelSignIn, signInWithEmail, error } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState("");

  const redirectURL = location.state?.from || "/shop";
  // sign in with google function
  const handleGoogle = () => {
    goooelSignIn()
      .then((result) => {
        setErrorMsg("");
        history.push(location.state?.from || "/shop");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const onSubmit = (data) => {
    signInWithEmail(data.email, data.password)
      .then((result) => {
        setErrorMsg("");
        history.push(redirectURL);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  return (
    <div className="register">
      <h1 className="text-center display-4"> Please Log In </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            max: 19,
            min: 5,
            maxLength: 20,
          })}
        />
        <button className="btn btn-outline-success" type="submit">
          Log In
        </button>
        <span> Or </span>
        <button className="btn btn-outline-success" onClick={handleGoogle}>
          Sign in with Google
        </button>
        <Link to="/register" onClick="" className="mx-4 btn" href="">
          New user? Register
        </Link>
      </form>
      {(errorMsg || error) && (
        <p className="text-danger mt-5 ">{errorMsg || error}</p>
      )}
    </div>
  );
};

export default Login;
