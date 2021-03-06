import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import format from "date-fns/format";
import axios from "axios";
import UserContext from "../context/UserContext";
import ProfilePic from "./students/ProfilePic";
import { PROFILE_URL, URL_PREFIX } from "../data/constants";
import "../App.css";

const TopNav = () => {
  const { user, setUser, token } = useContext(UserContext);
  const [added, setAdded] = useState(null);
  let history = useHistory();

  const date = new Date();
  const dateString = `${date.getFullYear()}_${
    date.getMonth() + 1
  }_${date.getDate()}`;

  useEffect(() => {
    axios
      .get(`${URL_PREFIX}/student?date=${dateString}`, {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => {
        setAdded(res.data);
      });
  }, [user, dateString, token]);

  const handleLogOut = () => {
    setUser(null);
    history.push("/landing");
  };

  return (
    <>
      {!user ? (
        <Navbar className="nav-bar">
          <Navbar.Brand
            className="mr-3"
            style={{ color: "#f8f5c9", fontSize: "40px" }}
          >
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
          <Navbar.Brand style={{ color: "#f8f5c9", fontSize: "40px" }}>
            {user.type === "admin" ? (
              <Link className="text-cream nav-link" to="/admin-dashboard">
                Hogwarts
              </Link>
            ) : (
              "Hogwarts"
            )}
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
              {added ? added.result : 0} Students Were Added Today
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
