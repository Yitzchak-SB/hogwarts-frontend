import React from "react";
import StudentsTable from "./StudentsTable";
import SkillsPieChart from "./SkillsPieChart";
import { Card, CardGroup } from "react-bootstrap";

function AdminDashboard({ students }) {
  return (
    <>
      <Card>
        <Card.Title>Student Table</Card.Title>
        <Card.Body>
          <StudentsTable students={students} />
        </Card.Body>
      </Card>
      <CardGroup>
        <Card>
          <Card.Title>Existing Skills</Card.Title>
          <Card.Body>
            <SkillsPieChart skillType="exist" />
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>Desired Skills</Card.Title>
          <Card.Body>
            <SkillsPieChart skillType="desire" />
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}

export default AdminDashboard;
