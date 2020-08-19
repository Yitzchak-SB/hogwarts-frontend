import React from "react";
import { Card, Row, Button, Col, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteModal from "../util/DeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
            {student._existing_magic_skills.map((skill) => {
              const percent = (100 / skill.num_of_levels) * skill.level;
              return (
                <>
                  <p className="text-wine mt-1 mb-1">
                    {skill.name.replace("_", " ")}
                  </p>
                  <ProgressBar
                    style={{ width: "100%", backgroundColor: "#A69177" }}
                    animated
                    variant="danger"
                    now={percent}
                    max={100}
                    label={`${percent}%`}
                  />
                </>
              );
            })}
          </Col>
          <Col sm={6}>
            <h4 className="text-wine">Desired</h4>
            {student._desired_magic_skills.map((skill) => {
              const percent = (100 / skill.num_of_levels) * skill.level;
              return (
                <>
                  <p className="text-wine mt-1 mb-1">
                    {skill.name.replace("_", " ")}
                  </p>
                  <ProgressBar
                    style={{ width: "100%", backgroundColor: "#A69177" }}
                    animated
                    variant="danger"
                    now={percent}
                    max={100}
                    label={`${percent}%`}
                  />
                </>
              );
            })}
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
