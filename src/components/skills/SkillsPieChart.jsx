import React, { useEffect, useContext } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import axios from "axios";
import { COLORS } from "../../data/constants";
import UserContext from "../../context/UserContext";

function SkillsPieChart({ skillType }) {
  const [skills, setSkills] = useState([]);
  const context = useContext(UserContext);

  useEffect(() => {
    const urls = context.skills.map((skill) =>
      axios.get(`http://127.0.0.1:5000//${skillType}?skill=${skill.name}`)
    );
    axios.all(urls).then(
      axios.spread((...responses) => {
        const results = responses.map((response) => response.data);
        setSkills(results);
      })
    );
  }, [skillType, context.skills]);
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
