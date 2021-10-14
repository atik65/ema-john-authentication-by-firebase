import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./register.css";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const { goooelSignIn, createNewUserWithEmail, error } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  // direct registration with google function
  const handleGoogle = () => {
    goooelSignIn()
      .then((result) => {
        setErrorMsg("");
        history.push("/shop");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const onSubmit = (data) => {
    createNewUserWithEmail(data.email, data.password)
      .then((result) => {
        setErrorMsg("");
        history.push("/shop");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  return (
    <div className="register">
      <h1 className="text-center display-4"> Please Register </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          className="form-control"
          type="text"
          placeholder="First Name"
          {...register("fName", {})}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Last Name"
          {...register("lName", {})}
        />
        <div>
          <label className="me-3"> Gender: </label>
          <input
            className="mx-1"
            {...register("gender", {})}
            type="radio"
            value="male"
          />
          <label className="me-3">Male</label>
          <input
            className="mx-1"
            {...register("gender", {})}
            type="radio"
            value=" female"
          />
          <label htmlFor=""> Female </label>
        </div>
        <input
          className="form-control"
          type="tel"
          placeholder="Mobile number"
          {...register("mobile", {
            minLength: 6,
            maxLength: 12,
          })}
        />
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
          Register
        </button>
        <span> Or </span>
        <button className="btn btn-outline-success" onClick={handleGoogle}>
          Sign in with Google
        </button>
        <Link to="/login" onClick="" className="mx-4 btn" href="">
          Already an user? Login
        </Link>
      </form>
      {(errorMsg || error) && (
        <p className="text-danger  mt-5 ">{errorMsg || error}</p>
      )}
    </div>
  );
};

export default Register;
