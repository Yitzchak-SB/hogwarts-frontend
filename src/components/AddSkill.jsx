import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";
import { LEVELS, SKILLS } from "../data/constants";

function AddSkill(props) {
  const handleSubmit = (event) => {
    if (props.exist) {
      props.submitSkill(event, "activeSkills");
    } else {
      props.submitSkill(event, "desiredSkills");
    }
  };

  function handleSkillChange(event) {
    props.handleSkillChange(event, props.exist);
  }

  function handleLevelChange(event) {
    props.handleLevelChange(event, props.exist);
  }

  return (
    <>
      <FormControl>
        <InputLabel>Skill</InputLabel>
        <Select
          style={{ width: 300, margin: 15 }}
          value={props.skill ? props.skill : ""}
          onChange={handleSkillChange}
          input={<Input />}
        >
          {SKILLS.map((skill) => (
            <MenuItem key={skill} value={skill}>
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Level</InputLabel>
        <Select
          style={{ width: 300, margin: 15 }}
          value={props.level ? props.level : ""}
          onChange={handleLevelChange}
          input={<Input />}
        >
          {LEVELS.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="click" onClick={handleSubmit}>
        Add
      </Button>
    </>
  );
}

export default AddSkill;
