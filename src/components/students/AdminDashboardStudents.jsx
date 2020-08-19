import React, { useEffect, useState } from "react";
import { Card, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import StudentsTable from "./StudentsTable";
import SkillsPieChart from "../skills/SkillsPieChart";
import Axios from "axios";
import AnalyticCard from "./AnalyticCard";
import Spinner from "../util/Spinner";

function AdminDashboardStudents({ students, setTerm, term }) {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [lastCreated, setLastCreated] = useState(null);

  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/updated").then((res) => {
      setLastUpdated(res.data);
    });
    Axios.get("http://127.0.0.1:5000/created").then((res) => {
      setLastCreated(res.data);
    });
  }, [students]);

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
                variant="Secondary"
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