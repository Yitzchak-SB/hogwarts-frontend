import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfilePic from "./students/ProfilePic";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { formatDistanceToNow } from "date-fns";
import SkillsProgressBar from "./util/SkillsProgressBar";

const StudentPage = () => {
  const { email } = useParams("email");
  const [student, setStudent] = useState(null);
  const [date, setDate] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/student/${email}`)
      .then((res) => {
        setStudent(res.data);
        setDate(
          new Date(
            parseInt(`20${res.data._creation_time.slice(0, 2)}`),
            parseInt(res.data._creation_time.slice(3, 5)) - 1,
            parseInt(res.data._creation_time.slice(6, 8))
          )
        );
      })
      .catch((error) => console.log(error));
  }, [email]);

  return (
    <div className="d-flex justify-content-center align-items-center m-5">
      {student && (
        <>
          <Card className="m-5 text-wine dash-card text-center">
            <Card.Header className="align-center">{`${student._first_name} ${student._last_name}`}</Card.Header>
            <Card.Body>
              <ProfilePic url={student._image_url} />
              <Row>
                <Card className="m-2 dash-card">
                  <Card.Header>Existing Magic Skills</Card.Header>
                  <Card.Body>
                    <SkillsProgressBar
                      skills={student._existing_magic_skills}
                    />
                  </Card.Body>
                </Card>
                <Card className="m-2 dash-card">
                  <Card.Header>Desired Magic Skills</Card.Header>
                  <Card.Body>
                    <SkillsProgressBar skills={student._desired_magic_skills} />
                  </Card.Body>
                </Card>
              </Row>
            </Card.Body>
            {date && (
              <Card.Footer className="mt-5">{`Created ${formatDistanceToNow(
                date
              )} ago`}</Card.Footer>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default StudentPage;
