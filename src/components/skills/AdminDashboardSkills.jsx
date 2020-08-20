import React, { useState, useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddSkill from "./AddSkill";
import UserContext from "../../context/UserContext";
import SkillCard from "./SkillCard";
import SkillBreakDown from "./SkillBreakDown";

const AdminDashboardSkills = () => {
  const [skills, setSkills] = useState(null);
  const context = useContext(UserContext);

  useEffect(() => {
    setSkills(context.skills);
  }, [context.skills]);

  return (
    <Row>
      <Col sm={3}>
        <SkillBreakDown />
      </Col>
      <Col sm={6}>
        <AddSkill />
      </Col>
      <Col sm={3}>
        {skills &&
          skills.map((skill) => (
            <SkillCard
              key={Date.now() * Math.random()}
              name={skill.name}
              description={skill.description}
              levels={skill.maxLevel}
            />
          ))}
      </Col>
    </Row>
  );
};

export default AdminDashboardSkills;
