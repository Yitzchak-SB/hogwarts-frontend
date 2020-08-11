import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import Axios from "axios";

function SkillsPieChart() {
  const [skills, setSkills] = useState(null);

  const colors = [
    "#FFE4C4",
    "#000000",
    "#FFEBCD",
    "#0000FF",
    "#8A2BE2",
    "#A52A2A",
    "#5F9EA0",
  ];

  useEffect(() => {
    Axios.get("http://127.0.0.1:5000//skills").then((res) => {
      setSkills(res.data["skills"]);
    });
  }, []);

  const values = () => {
    if (skills) {
      let result = [];
      let index = 0;
      for (let skill in skills["desired_skills"]) {
        result.push({
          title: skills["desired_skills"][skill].name,
          value: parseInt(skills["desired_skills"][skill].count) + 1,
          color: colors[index],
        });
        index++;
      }
      return result;
    }
  };

  const pieChartValues = values();
  console.log(pieChartValues);

  return <PieChart data={pieChartValues} />;
}

export default SkillsPieChart;
