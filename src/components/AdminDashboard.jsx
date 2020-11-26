import React, { useState, useContext } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AdminDashboardStudents from "./students/AdminDashboardStudents";
import AdminDashboardSkills from "./skills/AdminDashboardSkills";
import StudentForm from "./StudentForm";
import Notification from "./Notification";
import UserContext from "../context/UserContext";

function AdminDashboard({ students, setTerm, term }) {
  const [key, setKey] = useState("students");
  const { user } = useContext(UserContext);
  const resetTab = () => {
    setKey("students");
  };
  return (
    <>
      {user && <Notification />}
      <Tabs
        className="pl-1 mt-3 admin-tab"
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="students" title="Students">
          <AdminDashboardStudents
            students={students}
            setTerm={setTerm}
            term={term}
          />
        </Tab>
        <Tab eventKey="skills" title="Skills">
          <AdminDashboardSkills />
        </Tab>
        <Tab eventKey="add_student" title="Add Student">
          <StudentForm setKey={resetTab} edit={false} />
        </Tab>
      </Tabs>
    </>
  );
}

export default AdminDashboard;
