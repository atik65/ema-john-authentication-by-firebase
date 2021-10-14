import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="text-center my-5">
        <div
          style={{ width: "80px", height: "80px" }}
          className="spinner-border  text-primary"
          role="status"
        ></div>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
