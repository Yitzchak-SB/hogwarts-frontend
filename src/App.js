import React from "react";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import UserContext from "./context/UserContext";
import Axios from "axios";
import { Container } from "@material-ui/core";
import TopNav from "./components/TopNav";
import StudentPage from "./components/StudentPage";
import StudentForm from "./components/StudentForm";

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
      <Router>
        <Container>
          <UserContext.Provider
            value={{
              user: this.state.user,
              setUser: this.setUser,
              students: this.state.students,
              deleteStudent: this.deleteStudent,
              updateStudents: this.updateStudents,
            }}
          >
            <div className="app">
              <TopNav />
              <PrivateRoute
                dashboard="/admin-dashboard"
                login="/login"
                user={this.state.user}
              />
            </div>
            <Switch>
              <Route exact path="/admin-dashboard">
                <AdminDashboard students={this.state.students} />
              </Route>
              <Route path="/add-student">
                <StudentForm />
              </Route>
              <Route path="/edit-student/:email">
                <StudentForm edit="true" />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/user-page/:firstName/:lastName">
                <StudentPage />
              </Route>
            </Switch>
          </UserContext.Provider>
        </Container>
      </Router>
    );
  }
}

export default App;
