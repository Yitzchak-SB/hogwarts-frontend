import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Axios from "axios";
import UserContext from "../context/UserContext";
import ProfilePic from "./students/ProfilePic";
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
          <Navbar.Brand className="mr-3" style={{ color: "#f8f5c9" }}>
            Hogwarts
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav className="mr-3 nav-link">
              <Navbar.Text style={{ color: "#f8f5c9" }}>
                Probably The Best School In The World.
              </Navbar.Text>
            </Nav>
          </Nav>
          <Nav>
            <Navbar.Text
              style={{ color: "#f8f5c9" }}
              className="mr-sm-3 ml-sm-3"
            >
              {format(new Date(Date.now()), "dd/MM/yyyy")}
            </Navbar.Text>
          </Nav>
        </Navbar>
      ) : (
        <Navbar className="nav-bar">
          <Navbar.Brand style={{ color: "#f8f5c9" }}>
            <Link className="text-cream nav-link" to="/admin-dashboard">
              Hogwarts
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav className="mr-3">
              <Nav>
                <Navbar.Text style={{ color: "#f8f5c9" }} className="mr-sm-2">
                  Welcome {user._first_name}
                </Navbar.Text>
              </Nav>
              {user._img_url ? (
                <ProfilePic size={30} url={user._img_url} />
              ) : (
                <ProfilePic size={30} url={PROFILE_URL} />
              )}
            </Nav>
          </Nav>
          <Nav>
            <Navbar.Text
              style={{ color: "#f8f5c9" }}
              className="mr-sm-3 ml-sm-3"
            >
              {added.result} Students Were Added Today
            </Navbar.Text>
          </Nav>
          <Nav>
            <Navbar.Text
              style={{ color: "#f8f5c9" }}
              className="mr-sm-3 ml-sm-3"
            >
              {format(new Date(Date.now()), "dd/MM/yyyy")}
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
