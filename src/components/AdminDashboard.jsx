import React from "react";
import { Link } from "react-router-dom";
import StudentsTable from "./StudentsTable";
import SkillsPieChart from "./SkillsPieChart";

function AdminDashboard({ students }) {
  return (
    <>
      <Link to="/add-student">
        <span>Add Student</span>
      </Link>
      <StudentsTable students={students} />
      <SkillsPieChart />
    </>
  );
}

export default AdminDashboard;
