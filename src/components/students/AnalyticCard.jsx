import React from "react";
import ProfilePic from "./ProfilePic";
import Row from "react-bootstrap/Row";

function AnalyticCard({ data }) {
  return (
    <>
      <ul>
        {data &&
          data.map((student, index) => (
            <li key={Date.now() * Math.random()}>
              <Row>
                <span className="text-wine m-2">{index + 1}</span>
                <ProfilePic size={45} url={student.image_url} />
                <span className="text-wine m-2">{`${student.first_name} ${student.last_name}`}</span>
              </Row>
            </li>
          ))}
      </ul>
    </>
  );
}

export default AnalyticCard;
