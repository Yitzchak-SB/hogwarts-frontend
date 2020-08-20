import React from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ProfilePic from "./ProfilePic";

const FrontCard = ({ student, handleClick }) => {
  const history = useHistory();
  const redirectOnClick = () => {
    history.push(`/user-page/${student._email}`);
  };
  return (
    <Card
      className="dash-card student-card d-flex justify-content-center align-items-center"
      onClick={handleClick}
    >
      <Card.Header>{`${student._first_name} ${student._last_name}`}</Card.Header>
      <Card.Body>
        <Row className="mb-5 pb-5">
          <ProfilePic
            className="mb-5 pb-5"
            size={200}
            url={student._image_url}
          />
        </Row>
        <Row className="d-flex justify-content-center align-items-center pt-5 mt-5">
          <Button className="button-color mt-5" onClick={redirectOnClick}>
            Students Page
          </Button>
        </Row>
      </Card.Body>
      <Card.Footer>{student._email}</Card.Footer>
    </Card>
  );
};

export default FrontCard;
