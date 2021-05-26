import React from "react";
import { Route, Redirect } from "react-router-dom";
import authProvider from "../auth/provider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => {
        const isAuth = authProvider.checkAuth(null, "sync");
        return isAuth ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
