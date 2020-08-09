import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";

function AddSkill(props) {
  const skills = [
    "Potion making",
    "Spells",
    "Quidditch",
    "Animagus",
    "Apparate",
    "Metamorphmagi",
    "Parseltongue",
  ];
  const levels = ["1", "2", "3", "4", "5"];

  return (
    <>
      <FormControl>
        <InputLabel>Skill</InputLabel>
        <Select
          style={{ width: 300 }}
          value={props.skill ? props.skill : "Select Skill"}
          onChange={props.handleSkillChange}
          input={<Input />}
        >
          {skills.map((skill) => (
            <MenuItem key={skill} value={skill}>
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Level</InputLabel>
        <Select
          style={{ width: 300 }}
          value={props.level ? props.level : "Select Level"}
          onChange={props.handleLevelChange}
          input={<Input />}
        >
          {levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="click"
        onClick={props.exist ? props.submitExistSkill : props.submitDesireSkill}
      >
        Add
      </Button>
      <Button type="click" onClick={props.handleExit}>
        Exit
      </Button>
    </>
  );
}

export default AddSkill;
