import React from "react";
import { Link } from "react-router-dom";
import StudentsTable from "./StudentsTable";
import UserContext from "../context/UserContext";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: {} };
  }

  render() {
    return (
      <>
        <Link to="/add-student">
          <span>Add Student</span>
        </Link>
        <StudentsTable students={this.props.students} />
      </>
    );
  }
}

export default AdminDashboard;
AdminDashboard.contextType = UserContext;
