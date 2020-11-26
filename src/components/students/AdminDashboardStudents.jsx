import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import StudentsTable from "./StudentsTable";
import SkillsPieChart from "../skills/SkillsPieChart";

import AnalyticCard from "./AnalyticCard";
import Spinner from "../util/Spinner";
import UserContext from "../../context/UserContext";
import { URL_PREFIX } from "../../data/constants";

function AdminDashboardStudents({ students, setTerm, term }) {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [lastCreated, setLastCreated] = useState(null);
  const { token } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${URL_PREFIX}/updated`, {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => {
        setLastUpdated(res.data);
      });
    axios
      .get(`${URL_PREFIX}/created`, {
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => {
        setLastCreated(res.data);
      });
  }, [students, token]);

  const handleSortChange = (event) => {
    setTerm(event);
  };

  return (
    <>
      <Row>
        <Col sm={8}>
          <Card className="dash-card">
            <Card.Title className="card-title">Student Table</Card.Title>
            <Card.Body>
              <DropdownButton
                value={term}
                variant="danger"
                className="p-1 m-1"
                onSelect={handleSortChange}
                title="Sort By"
              >
                <Dropdown.Item eventKey="date_desc">Date Desc</Dropdown.Item>
                <Dropdown.Item eventKey="date_asc">Date Asc</Dropdown.Item>
                <Dropdown.Item eventKey="name_desc">Name Desc</Dropdown.Item>
                <Dropdown.Item eventKey="name_asc">Name Asc</Dropdown.Item>
              </DropdownButton>
              {students ? <StudentsTable /> : <Spinner />}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Row>
            <Col sm={12}>
              <Card className="dash-card">
                <Card.Title className="card-title">Existing Skills</Card.Title>
                <Card.Body>
                  <SkillsPieChart skillType="exist" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Card className="dash-card">
                <Card.Title className="card-title">Desired Skills</Card.Title>
                <Card.Body>
                  <SkillsPieChart skillType="desire" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Card className="dash-card">
                <Card.Title className="card-title">
                  Last 5 Created Students
                </Card.Title>
                <Card.Body>
                  <AnalyticCard data={lastCreated} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Card className="dash-card">
                <Card.Title className="card-title">
                  Last 5 Updated Students
                </Card.Title>
                <Card.Body>
                  <AnalyticCard data={lastUpdated} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default AdminDashboardStudents;
