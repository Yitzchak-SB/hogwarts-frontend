import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Container, Col } from "react-bootstrap";
import Axios from "axios";
import UserContext from "./context/UserContext";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import TopNav from "./components/TopNav";
import Spinner from "./components/util/Spinner";
import Landing from "./components/util/Landing";
import StudentForm from "./components/StudentForm";

const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));
const StudentPage = React.lazy(() => import("./components/StudentPage"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setUser = this.setUser.bind(this);
    this.updateStudents = this.updateStudents.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.setTerm = this.setTerm.bind(this);
    this.state = {
      user: null,
      students: [],
      term: "name_asc",
      index: 0,
      skills: null,
    };
  }

  async getAllStudents() {
    const newStudents = [];
    const res = await Axios.get(
      `http://127.0.0.1:5000/students?term=${this.state.term}&index=${this.state.index}`
    );
    for (let student in res.data.students) {
      newStudents.push(res.data.students[student]);
    }
    this.setState((state) => ({
      students: [...state.students, ...newStudents],
      index: state.index + 5,
    }));

    await Axios.get("http://127.0.0.1:5000/skills").then((res) => {
      const skillsNames = res.data.skills.map((skill) => ({
        name: skill.skill_name.replace("_", " "),
        level: Math.floor(Math.random() * 6),
        maxLevel: skill.num_of_levels,
        description: skill.skill_description,
      }));
      this.setState({ skills: skillsNames });
    });
  }

  componentDidMount() {
    this.getAllStudents();
  }

  setTerm(term) {
    this.setState({ term: term, students: [], index: 0 });
    this.getAllStudents();
  }

  async deleteStudent(event, student) {
    const request = { admin: this.state.user, student: student };
    const newStudents = this.state.students.filter(
      (user) => student.email !== user.email
    );
    this.setState({ students: newStudents });
    await Axios.post("http://127.0.0.1:5000/student-del", request);
    this.getAllStudents();
  }

  updateStudents() {
    this.getAllStudents();
  }

  setUser(userData) {
    this.setState({ user: userData });
  }

  render() {
    const { user, students, skills } = this.state;
    return (
      <Container fluid className="app">
        <Router>
          <UserContext.Provider
            value={{
              user: user,
              setUser: this.setUser,
              students: students,
              deleteStudent: this.deleteStudent,
              updateStudents: this.updateStudents,
              skills: skills,
            }}
          >
            <Row>
              <Col sm={12}>
                <TopNav />
                <PrivateRoute
                  dashboard="/admin-dashboard"
                  landing="/landing"
                  user={this.state.user}
                />
                <Switch>
                  <Route exact path="/admin-dashboard">
                    <Suspense fallback={<Spinner />}>
                      <AdminDashboard
                        students={this.state.students}
                        setTerm={this.setTerm}
                        ter={this.state.term}
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
                  <Route path="/user-page/:email">
                    <Suspense fallback={<Spinner />}>
                      <StudentPage />
                    </Suspense>
                  </Route>
                </Switch>
              </Col>
            </Row>
          </UserContext.Provider>
        </Router>
      </Container>
    );
  }
}

export default App;
