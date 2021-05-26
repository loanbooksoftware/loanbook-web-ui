import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./Routes/publicRoute";
import PrivateRoute from "./Routes/privateRoute";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./Commons/ErrorBoundary";

import Login from "./Login";

const SuperApp = () => (
  <ErrorBoundary>
    <Router>
      <Switch>
        <PublicRoute restricted exact path="/login" component={Login} />
        <PublicRoute exact path="/404" component={() => <div>404</div>} />
        <PrivateRoute path="/" component={App} />
      </Switch>
    </Router>
  </ErrorBoundary>
);

ReactDOM.render(
  <React.StrictMode>
    <SuperApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
