import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

const TopNav = () => {
  const { user } = useContext(UserContext);
  const [added, setAdded] = useState(null);

  const date = new Date();
  const dateString = `${date.getDate()}_${date.getMonth()}_${date
    .getFullYear()
    .toString()
    .slice(2)}`;

  useEffect(() => {
    Axios.get(`http://127.0.0.1:5000//student?date=${dateString}`).then(
      (res) => {
        setAdded(res.data);
        console.log(res);
      }
    );
  }, [user]);
  return (
    <>
      {!user && (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Hogwarts</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link className="text-muted" to="/login">
                Login
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="text-muted" to="/signup">
                Sign Up
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar>
      )}
      {user && (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Hogwarts</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link className="text-muted" to="/admin-dashboard">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="text-muted" to="/add-student">
                Add Students
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text className="mr-sm-2 text-white">
              Welcome {user._first_name}
            </Navbar.Text>
            <Navbar.Text className="mr-sm-2 ml-sm-2  text-muted">
              {added.result[0].count} Students Were Added Today
            </Navbar.Text>
          </Nav>
          <Button variant="outline-info">Log Out</Button>
        </Navbar>
      )}
    </>
  );
};

export default TopNav;
