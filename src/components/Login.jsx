import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import UserContext from "../context/UserContext";

import ErrorModal from "./util/ErrorModel";

const Login = ({ type }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  let history = useHistory();
  const { setUser } = useContext(UserContext);

  let notValid = userEmail === "" || userPassword === "";

  const handleEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loginError) setLoginError(false);
    const user = {
      email: userEmail,
      password: userPassword,
    };
    let url = "";
    if (type === "admin") url = "http://127.0.0.1:5000/admin/login";
    if (type === "student") url = "http://127.0.0.1:5000/student/login";
    axios
      .post(url, user)
      .then((res) => {
        let userData = res.data;
        userData.type = type;
        setUser(userData);
      })
      .then(() => {
        if (type === "admin") history.push("/admin-dashboard");
        if (type === "student") history.push(`/user-page/${userEmail}`);
      })
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
              className="button-color"
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

export default Login;
