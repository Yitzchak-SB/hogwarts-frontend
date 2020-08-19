import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import Axios from "axios";
import { COLORS } from "../../data/constants";
import { Card } from "react-bootstrap";

const SkillsByLevels = ({ name, maxLevel, skillType }) => {
  const [skills, setSkills] = useState([]);
  let display = true;

  useEffect(() => {
    const urls = Array(parseInt(maxLevel) + 1)
      .fill()
      .map((_, i) =>
        Axios.get(
          `http://127.0.0.1:5000//${skillType}?skill=${name}&level=${i}`
        )
      );
    Axios.all(urls).then(
      Axios.spread((...responses) => {
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
    <Card className="dash-card">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <PieChart
          data={pieChartValues}
          label={(data) =>
            `${data.dataEntry.title} ${((data.dataEntry.value / total) * 100)
              .toString()
              .slice(0, 5)}%`
          }
          style={{ fontSize: "2" }}
        />
      </Card.Body>
    </Card>
  ) : (
    <> </>
  );
};

export default SkillsByLevels;
