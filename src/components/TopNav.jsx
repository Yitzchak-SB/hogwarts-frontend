import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import ProfilePic from "./ProfilePic";
import { PROFILE_URL } from "../data/constants";
import "../App.css";

const TopNav = () => {
  const { user, setUser } = useContext(UserContext);
  const [added, setAdded] = useState(null);

  const date = new Date();
  const dateString = `${date.getFullYear()}_${
    date.getMonth() + 1
  }_${date.getDate()}`;

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
        <Navbar className="nav-bar">
          <Navbar.Brand style={{ color: "#f8f5c9" }}>Hogwarts</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav className="mr-2">
              <Link className="text-cream" to="/login">
                Login
              </Link>
            </Nav>
            <Nav className="mr-2">
              <Link className="text-cream" to="/signup">
                Sign Up
              </Link>
            </Nav>
          </Nav>
        </Navbar>
      ) : (
        <Navbar className="nav-bar">
          <Navbar.Brand style={{ color: "#f8f5c9" }}>Hogwarts</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav className="mr-2">
              <Link className="text-cream" to="/admin-dashboard">
                Home
              </Link>
            </Nav>
            <Nav className="mr-2">
              <Link className="text-cream" to="/add-student">
                Add Students
              </Link>
            </Nav>
          </Nav>
          <Nav>
            <Navbar.Text style={{ color: "#f8f5c9" }} className="mr-sm-2">
              Welcome {user._first_name}
            </Navbar.Text>
            {user._img_url ? (
              <ProfilePic size={30} url={user._img_url} />
            ) : (
              <ProfilePic size={30} url={PROFILE_URL} />
            )}
            <Navbar.Text
              style={{ color: "#f8f5c9" }}
              className="mr-sm-2 ml-sm-2"
            >
              {added.result} Students Were Added Today
            </Navbar.Text>
          </Nav>
          <Button className="text-cream button-color" onClick={handleLogOut}>
            Log Out
          </Button>
        </Navbar>
      )}
    </>
  );
};

export default TopNav;
