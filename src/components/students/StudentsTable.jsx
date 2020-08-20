import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import UserContext from "../../context/UserContext";
import InfiniteScroll from "react-infinite-scroller";
import FlipCard from "./FlipCard";
import Spinner from "../util/Spinner";

function StudentsTable(props) {
  const { students, updateStudents, studentsCount } = useContext(UserContext);

  let studentsArrays = [];
  for (let i = 0; i < students.length; i += 2) {
    let chunk = students.slice(i, i + 2);
    studentsArrays.push(chunk);
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={updateStudents}
      hasMore={parseInt(studentsCount) > students.length}
      loader={<Spinner key={Date.now() * Math.random()} />}
    >
      {studentsArrays.map((array) => (
        <Row key={Date.now() * Math.random()}>
          {array.map((student, index) => (
            <FlipCard
              key={Date.now() * Math.random()}
              className={`student-card${index}`}
              student={student}
            />
          ))}
        </Row>
      ))}
    </InfiniteScroll>
  );
}

export default StudentsTable;
