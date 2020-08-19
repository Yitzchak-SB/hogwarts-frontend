import React from "react";
import { Card } from "react-bootstrap";

const BackCard = ({ student, handleClick }) => {
  return (
    <Card className="dash-card" onClick={handleClick}>
      <Card.Header>{`${student.firstName} ${student.lastName}`}</Card.Header>
      <Card.Body></Card.Body>
      <Card.Footer>{student.email}</Card.Footer>
    </Card>
  );
};

export default BackCard;
