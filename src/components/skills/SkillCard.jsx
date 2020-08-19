import React from "react";
import { Card } from "react-bootstrap";

const SkillCard = ({ name, levels, description }) => {
  return (
    <Card className="dash-card">
      <Card.Header className="text-center">
        {name.replace("_", " ")}
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">{levels} Maximum Levels</Card.Footer>
    </Card>
  );
};

export default SkillCard;
