import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import Axios from "axios";
import { SKILLS, COLORS } from "../data/constants";

function SkillsPieChart({ skillType }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const urls = SKILLS.map((skill) =>
      Axios.get(`http://127.0.0.1:5000//${skillType}?skill=${skill.name}`)
    );
    Axios.all(urls).then(
      Axios.spread((...responses) => {
        const results = responses.map((response) => response.data);
        setSkills(results);
      })
    );
  }, [skillType]);
  let total = 0;
  const values = () => {
    if (skills) {
      let result = [];
      let index = 0;
      for (let i = 0; i < skills.length; i++) {
        for (let skill in skills[i]) {
          if (skills[i][skill]) {
            if (skills[i][skill][0]) {
              total += skills[i][skill][0].result;
              result.push({
                title: skill,
                value: skills[i][skill][0].result,
                color: COLORS[index],
              });
            }
          }
          index++;
        }
      }
      return result;
    }
  };
  const pieChartValues = values();
  return (
    <PieChart
      data={pieChartValues}
      label={(data) =>
        `${data.dataEntry.title} ${((data.dataEntry.value / total) * 100)
          .toString()
          .slice(0, 5)}%`
      }
      style={{ fontSize: "2" }}
    />
  );
}

export default SkillsPieChart;
