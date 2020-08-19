import React, { useContext } from "react";
import { Spinner, Row } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import FlipCard from "./FlipCard";

function StudentsTable(props) {
  const { students, updateStudents } = useContext(UserContext);

  let studentsArrays = [];
  for (let i = 0; i < students.length; i += 2) {
    let chunk = students.slice(i, i + 2);
    studentsArrays.push(chunk);
  }

  return (
    <>
      <InfiniteScroll
        dataLength={students.length} //This is important field to render the next data
        next={updateStudents}
        hasMore={true}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      ></InfiniteScroll>
      {studentsArrays.map((array) => (
        <Row>
          {array.map((student, index) => (
            <FlipCard
              key={Date.now() * Math.random()}
              className={`student-card${index}`}
              student={student}
            />
          ))}
        </Row>
      ))}
    </>
  );
}

export default StudentsTable;
