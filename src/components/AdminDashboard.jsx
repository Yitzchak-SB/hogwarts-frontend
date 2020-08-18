import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AdminDashboardStudents from "./AdminDashboardStudents";
import AdminDashboardSkills from "./AdminDashboardSkills";
import StudentForm from "./StudentForm";

function AdminDashboard({ students, setTerm, term }) {
  const [key, setKey] = useState("students");
  return (
    <Tabs
      className="mt-3 admin-tab"
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
        <StudentForm edit={false} />
      </Tab>
    </Tabs>
  );
}

export default AdminDashboard;
