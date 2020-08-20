import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import UserContext from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import TopNav from "./components/TopNav";
import Spinner from "./components/util/Spinner";
import Landing from "./components/util/Landing";
import StudentForm from "./components/StudentForm";
import "./App.css";

const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));
const StudentPage = React.lazy(() => import("./components/StudentPage"));

const App = () => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsCount, setStudentsCount] = useState(false);
  const [term, setTerm] = useState("name_asc");
  const [index, setIndex] = useState(0);
  const [skills, setSkills] = useState(null);

  const getAllStudents = async () => {
    const newStudents = students;
    const StudentsRes = await axios.get(
      `http://127.0.0.1:5000/students?term=${term}&index=${index}`
    );
    const newIndex = index + 5;
    if (!studentsCount) setStudentsCount(StudentsRes.data.row_count);
    for (let student in StudentsRes.data.students) {
      newStudents.push(StudentsRes.data.students[student]);
    }
    setStudents(newStudents);
    setIndex(newIndex);
    const skillsRes = await axios.get("http://127.0.0.1:5000/skills");
    const skillsNames = skillsRes.data.skills.map((skill) => ({
      name: skill.skill_name.replace("_", " "),
      level: Math.floor(Math.random() * (skill.num_of_levels + 1)),
      maxLevel: skill.num_of_levels,
      description: skill.skill_description,
    }));
    setSkills(skillsNames);
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const handleTerm = (term) => {
    setTerm(term);
    setStudents([]);
    setIndex(0);
    getAllStudents();
  };

  const deleteStudent = async (event, student) => {
    const request = { admin: user, student: student };
    const newStudents = students.filter((user) => student.email !== user.email);
    setStudents(newStudents);
    await axios.post("http://127.0.0.1:5000/student-del", request);
    getAllStudents();
  };

  const handleUser = (userData) => {
    setUser(userData);
  };

  return (
    <>
      <Router>
        <UserContext.Provider
          value={{
            user: user,
            setUser: handleUser,
            students: students,
            studentsCount: studentsCount,
            deleteStudent: deleteStudent,
            updateStudents: getAllStudents,
            skills: skills,
          }}
        >
          <Row>
            <Col sm={12}>
              <TopNav />
              <PrivateRoute
                dashboard="/admin-dashboard"
                landing="/landing"
                user={user}
              />
              <Switch>
                <Route path="/admin-dashboard">
                  <Suspense fallback={<Spinner />}>
                    <AdminDashboard
                      students={students}
                      setTerm={handleTerm}
                      ter={term}
                    />
                  </Suspense>
                </Route>
                <Route path="/landing">
                  <Landing />
                </Route>
                <Route path="/edit-student/:email">
                  <Suspense fallback={<Spinner />}>
                    <StudentForm edit={true} />
                  </Suspense>
                </Route>
                <Route exact path="/user-page/:email">
                  <Suspense fallback={<Spinner />}>
                    <StudentPage />
                  </Suspense>
                </Route>
              </Switch>
            </Col>
          </Row>
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
