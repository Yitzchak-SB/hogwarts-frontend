import React, { useContext, useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { withRouter, useHistory, useParams } from "react-router-dom";
import AddSkill from "./AddSkill";
import Axios from "axios";
import UserContext from "../context/UserContext";

function StudentForm({ edit }) {
  const [student, setStudent] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [activeSkills, setActiveSkills] = useState([]);
  const [desiredSkills, setDesiredSkills] = useState([]);
  const [exSkill, setExSkill] = useState("");
  const [exLevel, setExLevel] = useState("");
  const [deSkill, setDeSkill] = useState("");
  const [deLevel, setDeLevel] = useState("");

  const emailParam = useParams(email);

  const { user, students, updateStudents } = useContext(UserContext);

  useEffect(() => {
    if (edit) {
      const studentArray = students.filter(
        (student) => student._email === emailParam.email
      );
      let student = null;
      if (studentArray) {
        student = studentArray[0];
        setStudent(student);
        setFirstName(student._first_name);
        setLastName(student._last_name);
        setEmail(student._email);
        setDesiredSkills(student._desired_magic_skills);
        setActiveSkills(student._existing_magic_skills);
      }
    }
  }, [emailParam.email, edit, students]);

  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    validateInput();
    if (!errorName && !errorEmail && !errorPassword) {
      const student = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password1,
        existing_magic_skills: activeSkills,
        desired_magic_skills: desiredSkills,
      };
      let url = edit
        ? "http://127.0.0.1:5000/student/edit"
        : "http://127.0.0.1:5000/student";
      Axios.post(url, {
        data: {
          initial_email: student.email,
          admin: user,
          student: student,
        },
      }).then(() => {
        history.push("/admin-dashboard");
        updateStudents();
      });
    }
  }

  function submitSkill(event, skillType) {
    event.preventDefault();
    if (skillType === "activeSkills") {
      const skillObj = { name: exSkill, level: exLevel };
      setExSkill("");
      setExLevel("");
      const newSkills = [...activeSkills, skillObj];
      setActiveSkills(newSkills);
    } else if (skillType === "desiredSkills") {
      const skillObj = { name: deSkill, level: deLevel };
      setDeSkill("");
      setDeLevel("");
      const newSkills = [...desiredSkills, skillObj];
      setDesiredSkills(newSkills);
    }
  }
  function validateInput() {
    if (firstName === "" || lastName === "") setErrorName(true);
    else if (email === "") {
      setErrorName(false);
      setErrorEmail(true);
    } else if (
      password1 !== password2 ||
      password1.length < 8 ||
      password2.length < 8
    ) {
      setErrorPassword(true);
      setErrorName(false);
      setErrorEmail(false);
    } else {
      setErrorEmail(false);
      setErrorName(false);
      setErrorPassword(false);
    }
  }
  const valid = firstName === "" || lastName === "" || email === "";

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }
  function handleLastName(event) {
    setLastName(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword1(event) {
    setPassword1(event.target.value);
  }
  function handlePassword2(event) {
    setPassword2(event.target.value);
  }
  function handleSkill(event, exist) {
    if (exist) return setExSkill(event.target.value);
    return setDeSkill(event.target.value);
  }
  function handleLevel(event, exist) {
    if (exist) return setExLevel(event.target.value);
    return setDeLevel(event.target.value);
  }

  return (
    <>
      {student ? (
        <h1>
          Edit {student._first_name} {student._last_name}
        </h1>
      ) : (
        <h2>Add Student</h2>
      )}
      <form>
        <TextField
          required
          onChange={handleFirstName}
          label="First Name"
          value={firstName}
          variant="outlined"
        />
        <TextField
          required
          onChange={handleLastName}
          label="Last Name"
          value={lastName}
          variant="outlined"
        />
        <TextField
          required
          onChange={handleEmail}
          label="Email"
          value={email}
          variant="outlined"
          type="email"
        />{" "}
        {!edit && (
          <>
            <TextField
              onChange={handlePassword1}
              label="Password"
              value={password1}
              variant="outlined"
              type="password"
              helperText="Most Be At Least 8 Characters"
              error={errorPassword}
            />
            <TextField
              onChange={handlePassword2}
              label="Confirm Your Password"
              value={password2}
              variant="outlined"
              type="password"
              error={errorPassword}
            />
          </>
        )}
        <Button
          disabled={valid}
          onClick={handleSubmit}
          type="submit"
          variant="outlined"
        >
          Submit
        </Button>
      </form>
      <h3 className="m-3">Add Existing Skill</h3>
      <AddSkill
        exist={true}
        skill={exSkill}
        level={exLevel}
        handleSkillChange={handleSkill}
        submitSkill={submitSkill}
        handleLevelChange={handleLevel}
      />
      <h3 className="m-3">Add Desired Skill</h3>
      <AddSkill
        exist={false}
        skill={deSkill}
        level={deLevel}
        handleSkillChange={handleSkill}
        submitSkill={submitSkill}
        handleLevelChange={handleLevel}
      />
    </>
  );
}

export default withRouter(StudentForm);
