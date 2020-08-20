import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../util/DeleteModal";
import SkillsProgressBar from "../util/SkillsProgressBar";

const BackCard = ({ student, handleClick }) => {
  const date = new Date(
    parseInt(`20${student._creation_time.slice(0, 2)}`),
    parseInt(student._creation_time.slice(3, 5)) - 1,
    parseInt(student._creation_time.slice(6, 8))
  );
  return (
    <Card
      className="dash-card student-card d-flex justify-content-center align-items-center"
      onClick={handleClick}
    >
      <Card.Header>{`${student._first_name} ${student._last_name}`}</Card.Header>
      <Card.Body>
        <Row>
          <Col sm={6}>
            <h4 className="text-wine">Existing</h4>
            <SkillsProgressBar skills={student._existing_magic_skills} />
          </Col>
          <Col sm={6}>
            <h4 className="text-wine">Desired</h4>
            <SkillsProgressBar skills={student._desired_magic_skills} />
          </Col>
        </Row>
        <Row className=" d-flex justify-content-center align-items-center">
          <DeleteModal student={student} />
          <Link to={`/edit-student/${student._email}`}>
            <Button className="mt-3 button-color">
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          </Link>
        </Row>
      </Card.Body>
      <Card.Footer>{`Created at: ${date.toDateString()}`}</Card.Footer>
    </Card>
  );
};

export default BackCard;
