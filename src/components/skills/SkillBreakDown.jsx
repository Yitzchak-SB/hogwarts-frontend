import React, { useState, useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import UserContext from "../../context/UserContext";
import SkillsByLevels from "./SkillsByLevels";

const SkillBreakDown = () => {
  const [skillNames, setSkillNames] = useState(false);
  const [skillType, setSkillType] = useState("Exist");
  const { skills } = useContext(UserContext);
  useEffect(() => {
    if (skills) {
      const names = skills.map((skill) => ({
        name: skill.name,
        maxLevel: skill.maxLevel,
      }));
      setSkillNames(names);
    }
  }, [skills]);

  const handleSkillType = () => {
    if (skillType === "Exist") return setSkillType("Desire");
    setSkillType("Exist");
  };

  return (
    <Card className="skill-card">
      <Card.Header>Skills Breakdown By Levels</Card.Header>
      <Card.Body>
        <Row className="d-flex justify-content-center align-items-center">
          <Button className=" button-color" onClick={handleSkillType}>
            {skillType}
          </Button>
        </Row>
        {skillNames &&
          skillNames.map((skill) => (
            <SkillsByLevels
              key={Date.now() * Math.random()}
              name={skill.name}
              maxLevel={skill.maxLevel}
              skillType={skillType.toLowerCase()}
            />
          ))}
      </Card.Body>
    </Card>
  );
};

export default SkillBreakDown;
