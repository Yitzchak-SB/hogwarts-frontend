import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import ProfilePic from "./ProfilePic";
import { PROFILE_URL } from "../data/constants";

const TopNav = () => {
  const { user, setUser } = useContext(UserContext);
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
      }
    );
  }, [user, dateString]);

  const handleLogOut = () => {
    setUser(null);
  };

  return (
    <>
      {!user ? (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Hogwarts</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav className="mr-2">
              <Link className="text-muted" to="/login">
                Login
              </Link>
            </Nav>
            <Nav className="mr-2">
              <Link className="text-muted" to="/signup">
                Sign Up
              </Link>
            </Nav>
          </Nav>
        </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Hogwarts</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav className="mr-2">
              <Link className="text-muted" to="/admin-dashboard">
                Home
              </Link>
            </Nav>
            <Nav className="mr-2">
              <Link className="text-muted" to="/add-student">
                Add Students
              </Link>
            </Nav>
          </Nav>
          <Nav>
            <Navbar.Text className="mr-sm-2 text-white">
              Welcome {user._first_name}
            </Navbar.Text>
            {user._img_url ? (
              <ProfilePic url={user._img_url} />
            ) : (
              <ProfilePic url={PROFILE_URL} />
            )}
            <Navbar.Text className="mr-sm-2 ml-sm-2  text-muted">
              {added.result[0].count} Students Were Added Today
            </Navbar.Text>
          </Nav>
          <Button onClick={handleLogOut} variant="outline-info">
            Log Out
          </Button>
        </Navbar>
      )}
    </>
  );
};

export default TopNav;
