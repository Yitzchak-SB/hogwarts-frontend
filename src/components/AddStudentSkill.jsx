import React, { useState, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import Axios from "axios";

function AddStudentSkill(props) {
  const [skills, setSkills] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (props.skills) return setSkills(props.skills);
    Axios.get("http://127.0.0.1:5000/skills").then((res) => {
      const skillsNames = res.data.skills.map((skill) => ({
        name: skill.skill_name,
        level: Math.floor(Math.random() * 6),
        maxLevel: skill.num_of_levels,
      }));
      setSkills(skillsNames);
    });
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
    setDone(true);
    props.submitSkills(skills);
  };

  const handleEdit = () => {
    setDone(false);
  };

  return (
    <>
      {done ? (
        <Button className="button-color m-2" type="click" onClick={handleEdit}>
          {`Edit ${props.type} Skills`}
        </Button>
      ) : (
        <Form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <Form.Text className="text-wine">
            <h3>{`Add ${props.type} Skills`}</h3>
          </Form.Text>
          {skills &&
            skills.map((skill) => (
              <div key={Date.now() * Math.random()}>
                <Form.Label
                  className="text-wine"
                  key={Date.now() * Math.random()}
                >
                  {skill.name}
                </Form.Label>
                <Row key={`${skill.name}row`}>
                  <span
                    className="text-wine mr-1"
                    key={Date.now() * Math.random()}
                  >
                    0
                  </span>
                  <Form.Control
                    onChange={handleChange}
                    key={Date.now() * Math.random()}
                    name={skill.name}
                    defaultValue={skill.level}
                    type="range"
                    min={0}
                    max={skill.maxLevel}
                  ></Form.Control>
                  <span
                    className="text-wine ml-1"
                    key={Date.now() * Math.random()}
                  >
                    {skill.maxLevel}
                  </span>
                </Row>
              </div>
            ))}
          <Button className="button-color" type="click" onClick={handleSubmit}>
            Add
          </Button>
        </Form>
      )}
    </>
  );
}

export default AddStudentSkill;
