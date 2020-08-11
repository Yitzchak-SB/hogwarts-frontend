import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import UserContext from "../context/UserContext";
import DeleteModal from "./DeleteModal";

function StudentsTable(props) {
  const history = useHistory();
  const context = useContext(UserContext);

  const redirectOnClick = (event, student) => {
    history.push(`/user-page/${student.firstName + student.lastName}`);
  };

  const GetSkillStr = (object) => {
    let desiredSkills = "";
    let existingSkills = "";
    if (object.activeSkills) {
      for (let skills in object.activeSkills) {
        for (let skill in object.activeSkills[skills]) {
          existingSkills += `${object.activeSkills[skills][skill].name} Level ${object.activeSkills[skills][skill].level} `;
        }
      }
    }
    if (object.desiredSkills) {
      for (let skills in object.desiredSkills) {
        for (let skill in object.desiredSkills[skills]) {
          desiredSkills += `${object.desiredSkills[skills][skill].name} Level ${object.desiredSkills[skills][skill].level} \n`;
        }
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
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={Date.now() * Math.random()}>
                {column.label}
              </TableCell>
            ))}
            <TableCell key={Date.now() * Math.random()}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsData.map((student) => {
            return (
              <TableRow hover role="checkbox" key={Date.now() * Math.random()}>
                {columns.map((column) => {
                  const value = student[column.tag];
                  return (
                    <TableCell
                      onClick={(event) => {
                        redirectOnClick(event, student);
                      }}
                      key={Date.now() * Math.random()}
                    >
                      {value}
                    </TableCell>
                  );
                })}

                <TableCell key={Date.now() * Math.random()}>
                  <DeleteModal student={student} />
                  <Link to={`/edit-student/${student.email}`}>
                    <Button>Edit Student</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentsTable;
