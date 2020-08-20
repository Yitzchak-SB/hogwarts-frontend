import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const SkillsProgressBar = ({ skills }) => {
  return (
    <>
      {skills.map((skill) => {
        const percent = (100 / skill.num_of_levels) * skill.level;
        return (
          <div key={Date.now() * Math.random()}>
            <span
              key={Date.now() * Math.random()}
              className="text-wine mt-1 mb-1"
            >
              {skill.name.replace("_", " ")}
            </span>
            <ProgressBar
              key={Date.now() * Math.random()}
              style={{ width: "100%", backgroundColor: "#A69177" }}
              animated
              variant="danger"
              now={percent}
              max={100}
              label={`${percent}%`}
            />
          </div>
        );
      })}
    </>
  );
};

export default SkillsProgressBar;
