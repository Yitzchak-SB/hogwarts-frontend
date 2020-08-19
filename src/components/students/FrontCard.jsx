import React from "react";
import { Card } from "react-bootstrap";
import ProfilePic from "./ProfilePic";

const FrontCard = ({ student, handleClick }) => {
  return (
    <Card className="dash-card" onClick={handleClick}>
      <Card.Header>{`${student.firstName} ${student.lastName}`}</Card.Header>
      <Card.Body>
        <ProfilePic url={student.image_url} />
      </Card.Body>
      <Card.Footer>{student.email}</Card.Footer>
    </Card>
  );
};

export default FrontCard;
