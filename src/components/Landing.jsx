import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Login from "./Login";
import SignUp from "./SignUp";

function Landing() {
  const [key, setKey] = useState("login");
  return (
    <Tabs
      className="mt-3 admin-tab"
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="login" title="Login">
        <Login />
      </Tab>
      <Tab eventKey="signUp" title="Sign Up">
        <SignUp />
      </Tab>
    </Tabs>
  );
}

export default Landing;
