import React, { useState, useEffect } from "react";
import { LEVELS, SKILLS } from "../data/constants";
import { Form, Button, Row } from "react-bootstrap";

function AddStudentSkill(props) {
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    if (props.skills) return setSkills(props.skills);
    setSkills(SKILLS);
  }, [props.skills]);

  const handleChange = (event) => {
    const skillIndex =
      skills.findIndex((item) => item.name === event.target.name) || 0;
    let tempSkills = skills;
    tempSkills[skillIndex] = {
      name: event.target.name,
      level: parseInt(event.target.value),
    };
    setSkills(tempSkills);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitSkills(skills);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Text className="align-center text-wine">
          <h3>{`Add ${props.type} Skills`}</h3>
        </Form.Text>
        {skills &&
          skills.map((skill) => (
            <>
              <Form.Label className="text-wine" key={`${skill.name}label`}>
                {skill.name}
              </Form.Label>
              <Row key={`${skill.name}row`}>
                <span className="text-wine mr-1" key={`${skill.name}0`}>
                  0
                </span>
                <Form.Control
                  onChange={handleChange}
                  key={skill.name}
                  name={skill.name}
                  defaultValue={skill.level}
                  type="range"
                  min={0}
                  max={Math.max(...LEVELS)}
                ></Form.Control>
                <span className="text-wine ml-1" key={`${skill}5`}>
                  5
                </span>
              </Row>
            </>
          ))}
        <Button className="button-color" type="click" onClick={handleSubmit}>
          Add
        </Button>
      </Form>
    </>
  );
}

export default AddStudentSkill;
