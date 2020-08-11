import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import UserContext from "../context/UserContext";
import DeleteModal from "./DeleteModal";
import { Table } from "react-bootstrap";

function StudentsTable(props) {
  const history = useHistory();
  const context = useContext(UserContext);

  const redirectOnClick = (event, student) => {
    history.push(`/user-page/${student.firstName + student.lastName}`);
  };

  const GetSkillStr = (object) => {
    let desiredSkills = "";
    let existingSkills = "";
    if (object._existing_magic_skills) {
      for (let skill in object._existing_magic_skills) {
        existingSkills += `${object._existing_magic_skills[skill].name} Level ${object._existing_magic_skills[skill].level} `;
      }
    }
    if (object._desired_magic_skills) {
      for (let skill in object._desired_magic_skills) {
        desiredSkills += `${object._desired_magic_skills[skill].name} Level ${object._desired_magic_skills[skill].level} \n`;
      }
    }
    return { desire: desiredSkills, exist: existingSkills };
  };
  const columns = [
    { label: "First Name", tag: "firstName" },
    { label: "Last Name", tag: "lastName" },
    { label: "Email", tag: "email" },
    { label: "Existing Skills", tag: "existingSkills" },
    { label: "Desired Skills", tag: "desiredSkills" },
  ];
  let studentsData = context.students.map((student) => {
    const skills = GetSkillStr(student);
    return {
      firstName: student._first_name,
      lastName: student._last_name,
      email: student._email,
      existingSkills: skills.exist,
      desiredSkills: skills.desire,
    };
  });

  return (
    <Table size="sm" responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={Date.now() * Math.random()}>{column.label}</th>
          ))}
          <th key={Date.now() * Math.random()}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {studentsData.map((student) => {
          return (
            <tr key={Date.now() * Math.random()}>
              {columns.map((column) => {
                const value = student[column.tag];
                return (
                  <td
                    onClick={(event) => {
                      redirectOnClick(event, student);
                    }}
                    key={Date.now() * Math.random()}
                  >
                    {value}
                  </td>
                );
              })}

              <td key={Date.now() * Math.random()}>
                <DeleteModal student={student} />
                <Link to={`/edit-student/${student.email}`}>
                  <Button>Edit Student</Button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default StudentsTable;
