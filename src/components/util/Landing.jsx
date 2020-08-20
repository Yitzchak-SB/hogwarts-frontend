import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Login from "../Login";
import SignUp from "../SignUp";

function Landing() {
  const [key, setKey] = useState("admin-login");
  return (
    <Tabs
      className="pl-1 mt-3 admin-tab"
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="admin-login" title="Admin Login">
        <Login type="admin" />
      </Tab>
      <Tab eventKey="signUp" title="Sign Up">
        <SignUp type="admin" />
      </Tab>
      <Tab eventKey="student-login" title="Student Login">
        <Login type="student" />
      </Tab>
    </Tabs>
  );
}

export default Landing;
