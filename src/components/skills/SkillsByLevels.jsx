import React, { useEffect, useContext } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import axios from "axios";
import randomcolor from "randomcolor";
import { Card } from "react-bootstrap";
import UserContext from "../../context/UserContext";

const SkillsByLevels = ({ name, maxLevel, skillType }) => {
  const [skills, setSkills] = useState([]);
  const { token } = useContext(UserContext);
  let display = true;

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000//${skillType}?skill=${name}&max_level=${maxLevel}`,
        {
          headers: { Authorization: `JWT ${token}` },
        }
      )
      .then((res) => {
        setSkills(res.data[name]);
      });
  }, [skillType, maxLevel, name, token]);

  let total = 0;
  const values = () => {
    if (skills) {
      let result = skills.map((skill) => {
        total += parseInt(skill.result);
        return {
          title: `Level ${skill.level}`,
          value: parseInt(skill.result),
          color: randomcolor("#401c1c"),
        };
      });
      if (total <= 2) display = false;
      return result;
    }
  };
  const pieChartValues = values();

  return display ? (
    <Card className="skill-card">
      <Card.Header className="text-center">{name}</Card.Header>
      <Card.Body>
        <PieChart
          data={pieChartValues}
          label={(data) =>
            `${data.dataEntry.title} ${((data.dataEntry.value / total) * 100)
              .toString()
              .slice(0, 3)}%`
          }
          style={{ fontSize: "6" }}
        />
      </Card.Body>
    </Card>
  ) : (
    <> </>
  );
};

export default SkillsByLevels;
