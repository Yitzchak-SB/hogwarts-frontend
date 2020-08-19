import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const AddSkill = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(0);
  const [validated, setValidated] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = (event) => {
    validateInput(event);
    if (validated) {
      const skillData = {
        skill_name: name,
        num_of_levels: level,
        skill_description: description,
      };
      Axios.post("http://127.0.0.1:5000/skills", skillData)
        .then(history.push("/admin-dashboard"))
        .catch((error) => console.log(error));
    }
  };

  const validateInput = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col sm={{ span: 6 }}>
        <Card className="dash-card d-flex flex-column justify-content-center align-items-center">
          <Card.Header>Add New Skill</Card.Header>
          <Form
            className="d-flex flex-column justify-content-center align-items-center"
            noValidate
            validated={validated}
          >
            <Form.Label className="text-wine mt-1">Skill Name:</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              required
              className="mt-1 text-wine"
              onChange={handleName}
              placeholder="Type Here..."
              value={name}
            />
            <Form.Control.Feedback className="text-wine mt-1" type="invalid">
              Please provide a skill name.
            </Form.Control.Feedback>
            <Form.Label className="text-wine mt-1">
              Skill Description:
            </Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              required
              type="textarea"
              className="mt-1 text-wine"
              onChange={handleDescription}
              placeholder="Type Here..."
              value={description}
            />
            <Form.Control.Feedback className="text-wine mt-1" type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
            <Form.Label className="text-wine mt-1">
              Max number of levels:
            </Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              required
              type="number"
              className="mt-1 text-wine"
              onChange={handleLevel}
              value={level}
            />
            <Form.Control.Feedback className="text-wine mt-1" type="invalid">
              Please provide a Max number of levels.
            </Form.Control.Feedback>
            <Button
              onClick={handleSubmit}
              type="submit"
              className="text-cream button-color mt-2 "
            >
              Submit
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default withRouter(AddSkill);
