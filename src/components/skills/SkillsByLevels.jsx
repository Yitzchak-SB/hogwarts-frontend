import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import axios from "axios";
import { COLORS } from "../../data/constants";
import { Card } from "react-bootstrap";

const SkillsByLevels = ({ name, maxLevel, skillType }) => {
  const [skills, setSkills] = useState([]);
  let display = true;

  useEffect(() => {
    const urls = Array(parseInt(maxLevel) + 1)
      .fill()
      .map((_, i) =>
        axios.get(
          `http://127.0.0.1:5000//${skillType}?skill=${name}&level=${i}`
        )
      );
    axios.all(urls).then(
      axios.spread((...responses) => {
        const results = responses.map((response) => response.data);
        setSkills(results);
      })
    );
  }, [skillType, maxLevel, name]);

  let total = 0;
  const values = () => {
    if (skills) {
      let result = skills.map((skill, index) => {
        total += parseInt(skill[name].result);
        return {
          title: `Level ${skill[name].level}`,
          value: parseInt(skill[name].result),
          color: COLORS[index],
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
