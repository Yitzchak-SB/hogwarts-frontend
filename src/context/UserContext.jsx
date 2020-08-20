import React from "react";

const UserContext = React.createContext({
  user: null,
  setUser: null,
  students: null,
  studentsCount: null,
  deleteStudent: null,
  updateStudents: null,
  skills: null,
});

export default UserContext;
