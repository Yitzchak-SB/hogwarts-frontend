import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import Axios from "axios";

function SkillsPieChart({ skillType }) {
  const [skills, setSkills] = useState([]);

  const colors = [
    "#FFE4C4",
    "#B6322E",
    "#FFEBCD",
    "#0000FF",
    "#8A2BE2",
    "#A52A2A",
    "#5F9EA0",
  ];

  const skillsList = [
    "Potion making",
    "Spells",
    "Quidditch",
    "Animagus",
    "Apparate",
    "Metamorphmagi",
    "Parseltongue",
  ];

  useEffect(() => {
    for (let i = 0; i < skillsList.length; i++) {
      Axios.get(
        `http://127.0.0.1:5000//${skillType}?skill=${skillsList[i]}`
      ).then((res) => {
        setSkills((skills) => [...skills, res.data]);
      });
    }
  }, []);
  let total = 0;
  const values = () => {
    if (skills) {
      let result = [];
      let index = 0;
      for (let i = 0; i < skills.length; i++) {
        for (let skill in skills[i]) {
          if (skills[i][skill][0]) {
            total += skills[i][skill][0].result;
            result.push({
              title: skill,
              value: skills[i][skill][0].result,
              color: colors[index],
            });
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
        `${data.dataEntry.title} ${(data.dataEntry.value / total) * 100}%`
      }
      style={{ fontSize: "2" }}
    />
  );
}

export default SkillsPieChart;
