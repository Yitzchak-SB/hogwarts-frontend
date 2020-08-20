import React, { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserContext from "../../context/UserContext";

function AddStudentSkill(props) {
  const [skills, setSkills] = useState(null);
  const [done, setDone] = useState(false);
  const context = useContext(UserContext);

  useEffect(() => {
    if (props.skills) {
      const skillsArray = props.skills.map((skill) => ({
        name: skill.name,
        level: skill.level,
        maxLevel: skill.num_of_levels,
      }));
      setSkills(skillsArray);
    }
    setSkills(context.skills);
  }, [props.skills, context.skills]);

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
    const cleanSkills = skills.map((skill) => ({
      name: skill.name,
      level: skill.level,
    }));
    props.submitSkills(cleanSkills);
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
