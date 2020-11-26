import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserContext from "../context/UserContext";
import AddStudentSkill from "./students/AddStudentSkill";
import "../App.css";
import ProfilePic from "./students/ProfilePic";
import { PROFILE_URL, URL_PREFIX } from "../data/constants";
import ErrorModal from "./util/ErrorModel";

function StudentForm({ edit, setKey }) {
  const [student, setStudent] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [url, setUrl] = useState(PROFILE_URL);
  const [activeSkills, setActiveSkills] = useState(false);
  const [desiredSkills, setDesiredSkills] = useState(false);
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const emailParam = useParams(email);
  let history = useHistory();
  const { user, students, updateStudents, token } = useContext(UserContext);

  const validateInput = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!edit) {
      const emailCheck = students.filter(
        (student) => student.email === event.target.value
      );
      if (emailCheck.length > 0) return setEmailError(true);
    }
    setValidated(true);
  };

  useEffect(() => {
    if (user) {
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
          setUrl(student._image_url);
        }
      }
    }
  }, [emailParam.email, edit, students, user]);

  function handleSubmit(event) {
    event.preventDefault();
    validateInput(event);
    if (validated) {
      const student = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password1,
        image_url: url,
        existing_magic_skills: activeSkills,
        desired_magic_skills: desiredSkills,
      };
      let axiosUrl = edit
        ? `${URL_PREFIX}/student/edit`
        : `${URL_PREFIX}/student`;

      const headers = {
        contentType: "application/json",
        Authorization: `JWT ${token}`,
      };

      axios
        .post(
          axiosUrl,
          {
            data: {
              initial_email: student.email,
              admin: user,
              student: student,
            },
          },
          {
            headers: headers,
          }
        )
        .then(() => {
          updateStudents();
          if (edit) history.push("/admin-dashboard");
          setKey();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }
  function handleLastName(event) {
    setLastName(event.target.value);
  }
  function handleEmail(event) {
    if (emailError) setEmailError(false);
    setEmail(event.target.value);
  }
  function handlePassword1(event) {
    setPassword1(event.target.value);
  }
  function handlePassword2(event) {
    setPassword2(event.target.value);
  }
  function handleUrl(event) {
    setUrl(event.target.value);
  }
  function handleExistingSkills(skills) {
    setActiveSkills(skills);
  }
  function handleDesiredSkills(skills) {
    setDesiredSkills(skills);
  }

  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col sm={{ span: 6 }}>
        <Card className="dash-card d-flex flex-column justify-content-center align-items-center">
          {student ? (
            <Row>
              <ProfilePic
                size={50}
                url={student._image_url ? student._image_url : PROFILE_URL}
                style={{ display: "inline" }}
              />
              <h1 className="text-wine pl-3">
                {student._first_name} {student._last_name}
              </h1>
            </Row>
          ) : (
            <h2 className="text-wine">Add Student</h2>
          )}

          <Form
            noValidate
            validated={validated}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Form.Label className="text-wine mt-1">First Name:</Form.Label>
            <Form.Control
              required
              className="mt-1 text-wine"
              onChange={handleFirstName}
              placeholder="First Name"
              value={firstName}
            />
            <Form.Control.Feedback className="text-wine mt-1" type="invalid">
              Please provide a first name.
            </Form.Control.Feedback>
            <Form.Label className="text-wine mt-1">Last Name:</Form.Label>
            <Form.Control
              required
              className="mt-1 text-wine"
              onChange={handleLastName}
              placeholder="Last Name"
              value={lastName}
            />
            <Form.Control.Feedback className="text-wine mt-1" type="invalid">
              Please provide a last name.
            </Form.Control.Feedback>
            <Form.Label className="text-wine mt-1">Email:</Form.Label>
            <Form.Control
              required
              className="mt-1 text-wine"
              onChange={handleEmail}
              placeholder="Email"
              value={email}
              type="email"
            />
            <Form.Control.Feedback className="text-wine mt-1" type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Label className="text-wine mt-1">
              Profile Picture URL:
            </Form.Label>
            <Form.Control
              className="mt-1 text-wine"
              onChange={handleUrl}
              placeholder="Upload Profile Pic"
              value={url}
              type="url"
            />

            {!edit && (
              <>
                <Form.Label className="text-wine mt-1">Password:</Form.Label>
                <Form.Control
                  required
                  className="mt-1 text-wine"
                  onChange={handlePassword1}
                  placeholder="Type Your Password Here"
                  value={password1}
                  type="password"
                />
                <Form.Control.Feedback
                  className="text-wine mt-1"
                  type="invalid"
                >
                  Please check your password.
                </Form.Control.Feedback>
                <Form.Text className="text-muted mt-1">
                  Password must be at least 8 characters long
                </Form.Text>
                <Form.Control
                  required
                  className="mt-1 text-wine"
                  onChange={handlePassword2}
                  placeholder="Confirm Your Password"
                  value={password2}
                  type="password"
                />
                <Form.Control.Feedback
                  className="text-wine mt-1"
                  type="invalid"
                >
                  Please check your password.
                </Form.Control.Feedback>
              </>
            )}
            <Button
              onClick={handleSubmit}
              type="submit"
              className="text-cream button-color mt-2 "
            >
              Submit
            </Button>
          </Form>
          {emailError && (
            <ErrorModal
              title="We Have A Problem!"
              message="The email you provided already exists. Please fill in a different one."
              footer="OK, Got it!"
            />
          )}
          <AddStudentSkill
            skills={activeSkills}
            exist={true}
            type="Existing"
            submitSkills={handleExistingSkills}
          />
          <AddStudentSkill
            skills={desiredSkills}
            exist={false}
            type="Desired"
            submitSkills={handleDesiredSkills}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default StudentForm;
