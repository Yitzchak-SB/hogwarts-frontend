import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Table, Button, Spinner } from "react-bootstrap";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../context/UserContext";
import DeleteModal from "./DeleteModal";
import ProfilePic from "./ProfilePic";
import InfiniteScroll from "react-infinite-scroll-component";

function StudentsTable(props) {
  const history = useHistory();
  const context = useContext(UserContext);

  const redirectOnClick = (event, student) => {
    history.push(`/user-page/${student.email}`);
  };

  const GetSkillStr = (object) => {
    let desiredSkills = "";
    let existingSkills = "";
    if (object._existing_magic_skills) {
      for (let skill in object._existing_magic_skills) {
        if (object._existing_magic_skills[skill].level) {
          existingSkills += `${object._existing_magic_skills[skill].name} Level ${object._existing_magic_skills[skill].level} `;
        }
      }
    }
    if (object._desired_magic_skills) {
      for (let skill in object._desired_magic_skills) {
        if (object._desired_magic_skills[skill].level) {
          desiredSkills += `${object._desired_magic_skills[skill].name} Level ${object._desired_magic_skills[skill].level} \n`;
        }
      }
    }
    return { desire: desiredSkills, exist: existingSkills };
  };
  const columns = [
    { label: "Profile Picture", tag: "image_url" },
    { label: "First Name", tag: "firstName" },
    { label: "Last Name", tag: "lastName" },
    { label: "Email", tag: "email" },
    { label: "Existing Skills", tag: "existingSkills" },
    { label: "Desired Skills", tag: "desiredSkills" },
  ];
  let studentsData = context.students.map((student) => {
    const skills = GetSkillStr(student);
    return {
      image_url: student._image_url,
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
        <tr key={Date.now() * Math.random()} className="table-row">
          {columns.map((column) => (
            <th key={Date.now() * Math.random()}>{column.label}</th>
          ))}
          <th key={Date.now() * Math.random()}>Actions</th>
        </tr>
      </thead>
      <tbody>
        <InfiniteScroll
          dataLength={context.students.length} //This is important field to render the next data
          next={context.updateStudents}
          hasMore={true}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        ></InfiniteScroll>
        {studentsData.map((student) => {
          return (
            <tr className="table-row" key={Date.now() * Math.random()}>
              {columns.map((column) => {
                if (column.tag === "image_url") {
                  return (
                    <td key={Date.now() * Math.random()} className="table-cell">
                      {" "}
                      <ProfilePic url={student.image_url} />
                    </td>
                  );
                }
                return (
                  <td
                    className="link table-cell"
                    onClick={(event) => {
                      redirectOnClick(event, student);
                    }}
                    key={Date.now() * Math.random()}
                  >
                    <span>{student[column.tag]}</span>
                  </td>
                );
              })}

              <td
                className="table-cell mt-5 pt-5 mb-5 pb-5"
                key={Date.now() * Math.random()}
              >
                <DeleteModal student={student} />
                <Link to={`/edit-student/${student.email}`}>
                  <Button className="mt-3 button-color">
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
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
