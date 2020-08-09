import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => (
  <Route
    render={() => {
      return props.user ? (
        <Redirect to={props.dashboard} />
      ) : (
        <Redirect to={props.login} />
      );
    }}
  />
);

export default PrivateRoute;
