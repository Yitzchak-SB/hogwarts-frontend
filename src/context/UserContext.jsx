import React from "react";

const UserContext = React.createContext({
  user: null,
  setUser: null,
  students: null,
  deleteStudent: null,
  getStudents: null,
});

export default UserContext;
