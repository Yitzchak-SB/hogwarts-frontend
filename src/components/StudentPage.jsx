import React from "react";
import { useParams } from "react-router-dom";

function StudentPage(props) {
  const { firstName, lastName } = useParams("firstName");
  return (
    <>
      <h1>Student Page</h1>
      <p>
        Hello {firstName} {lastName}
      </p>
    </>
  );
}

export default StudentPage;
