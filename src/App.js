import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Container, Col } from "react-bootstrap";
import Axios from "axios";
import UserContext from "./context/UserContext";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import TopNav from "./components/TopNav";

const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));
const Login = React.lazy(() => import("./components/Login"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const StudentPage = React.lazy(() => import("./components/StudentPage"));
const StudentForm = React.lazy(() => import("./components/StudentForm"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setUser = this.setUser.bind(this);
    this.updateStudents = this.updateStudents.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.interval = false;
    this.state = { user: null, students: [] };
  }

  getAllStudents() {
    Axios.get("http://127.0.0.1:5000/students").then((res) => {
      const students = [];
      for (let student in res.data.students) {
        students.push(res.data.students[student]);
      }
      this.setState({ students: students });
    });
  }

  componentDidMount() {
    this.getAllStudents();
    this.interval = setInterval(() => this.getAllStudents(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  deleteStudent(event, student) {
    const request = { admin: this.state.user, student: student };
    const newStudents = this.state.students.filter(
      (user) => student.email !== user.email
    );
    this.setState({ students: newStudents });
    Axios.post("http://127.0.0.1:5000/student-del", request).then((res) =>
      this.getAllStudents()
    );
  }

  updateStudents() {
    this.getAllStudents();
  }

  setUser(userData) {
    this.setState({ user: userData });
  }

  render() {
    return (
      <Container fluid className="app">
        <Router>
          <UserContext.Provider
            value={{
              user: this.state.user,
              setUser: this.setUser,
              students: this.state.students,
              deleteStudent: this.deleteStudent,
              updateStudents: this.updateStudents,
            }}
          >
            <Row>
              <Col sm={12}>
                <TopNav />
                <PrivateRoute
                  dashboard="/admin-dashboard"
                  login="/login"
                  user={this.state.user}
                />
                <Switch>
                  <Route exact path="/admin-dashboard">
                    <Suspense
                      fallback={
                        <div className="text-center">
                          <div
                            className="spinner-grow text-secondary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      }
                    >
                      <AdminDashboard students={this.state.students} />
                    </Suspense>
                  </Route>
                  <Route path="/add-student">
                    <StudentForm />
                  </Route>
                  <Route path="/edit-student/:email">
                    <Suspense
                      fallback={
                        <div className="text-center">
                          <div
                            className="spinner-grow text-secondary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      }
                    >
                      <StudentForm edit="true" />
                    </Suspense>
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/signup">
                    <Suspense
                      fallback={
                        <div className="text-center">
                          <div
                            className="spinner-grow text-secondary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      }
                    >
                      <SignUp />
                    </Suspense>
                  </Route>
                  <Route path="/user-page/:email">
                    <Suspense
                      fallback={
                        <div className="text-center">
                          <div
                            className="spinner-grow text-secondary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      }
                    >
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
