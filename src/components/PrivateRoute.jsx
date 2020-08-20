import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = ({ dashboard, landing }) => {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <Route
      render={() => {
        return user && user.type === "admin" ? (
          <Redirect to={dashboard} />
        ) : user && user.type === "student" ? (
          <Redirect to={`/user-page/${user._email}`} />
        ) : (
          <Redirect to={landing} />
        );
      }}
    />
  );
};

export default PrivateRoute;
