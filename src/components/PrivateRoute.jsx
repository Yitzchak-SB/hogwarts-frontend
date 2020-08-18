import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ dashboard, landing, user }) => (
  <Route
    render={() => {
      return user ? <Redirect to={dashboard} /> : <Redirect to={landing} />;
    }}
  />
);

export default PrivateRoute;
