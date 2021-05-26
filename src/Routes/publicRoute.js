import React from "react";
import { Route, Redirect } from "react-router-dom";

import authProvider from "../auth/provider";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  // const [isAuth, setIsAuth] = useState(false);
  return (
    <Route
      {...rest}
      render={(props) => {
        const isAuth = authProvider.checkAuth(null, "sync");
        return isAuth && restricted ? (
          <Redirect to={"/"} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PublicRoute;
