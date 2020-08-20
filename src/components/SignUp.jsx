import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import UserContext from "../context/UserContext";
import ErrorModal from "./util/ErrorModel";
import { PROFILE_URL } from "../data/constants";

const SignUp = ({ type }) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userImageUrl, setUserImageUrl] = useState(PROFILE_URL);
  const [loginError, setLoginError] = useState(false);
  let history = useHistory();
  const { setUser } = useContext(UserContext);

  let notValid =
    userEmail === "" ||
    userPassword === "" ||
    userFirstName === "" ||
    userLastName;

  const handleFirstName = (event) => {
    setUserFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setUserLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleImage = (event) => {
    setUserImageUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loginError) setLoginError(false);
    const user = {
      first_name: userFirstName,
      last_name: userLastName,
      email: userEmail,
      password: userPassword,
      image_url: userImageUrl,
    };
    let url = "";
    if (type === "admin") url = "http://127.0.0.1:5000/admin";
    if (type === "student") url = "http://127.0.0.1:5000/student";
    axios
      .post(url, user)
      .then((res) => {
        setUser(res.data);
      })
      .then(() => history.push("/admin-dashboard"))
      .catch((error) => {
        console.log(error);
        setLoginError(true);
      });
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 3, offset: 4 }}>
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Form.Label className="m-2 p-2 text-cream">First Name:</Form.Label>
            <Form.Control
              className="m-2 p-2"
              required
              placeholder="John"
              onChange={handleFirstName}
              value={userFirstName}
            ></Form.Control>{" "}
            <Form.Label className="m-2 p-2 text-cream">Email:</Form.Label>
            <Form.Control
              className="m-2 p-2"
              required
              placeholder="Doe"
              onChange={handleLastName}
              value={userLastName}
            ></Form.Control>
            <Form.Label className="m-2 p-2 text-cream">
              Profile Picture Url:
            </Form.Label>
            <Form.Control
              className="m-2 p-2"
              required
              type="url"
              placeholder={PROFILE_URL}
              onChange={handleImage}
              value={userImageUrl}
            ></Form.Control>
            <Form.Label className="m-2 p-2 text-cream">Email:</Form.Label>
            <Form.Control
              className="m-2 p-2"
              required
              type="email"
              placeholder="you@example.com"
              onChange={handleEmail}
              value={userEmail}
            ></Form.Control>
            <Form.Label className="m-2 p-2 text-cream">Password:</Form.Label>
            <Form.Control
              className="m-2 p-2"
              required
              type="password"
              placeholder="********"
              onChange={handlePassword}
              value={userPassword}
            ></Form.Control>
            <Button
              className="button-color mb-4 mt-1"
              disabled={notValid}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
          {loginError && (
            <ErrorModal
              title="WE Have a Problem"
              message="Looks like you did not login."
              footer="Try again?"
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
