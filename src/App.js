import React from "react";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import UserContext from "./context/UserContext";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setUser = this.setUser.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
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
  }

  deleteStudent(event, student) {
    const newStudents = this.state.students.filter(
      (user) => student.email !== user.email
    );
    this.setState({ students: newStudents });
  }

  addStudent(student) {
    this.setState((state) => {
      return { students: [...state.students, student] };
    });
  }

  setUser(userData) {
    this.setState({ user: userData });
  }

  render() {
    return (
      <Router>
        <UserContext.Provider
          value={{
            user: this.state.user,
            setUser: this.setUser,
            students: this.state.students,
            deleteStudent: this.deleteStudent,
          }}
        >
          <div className="app">
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
          </Switch>
          <Switch>
            <Route path="/add-student">
              <AddStudent addStudent={this.addStudent} />
            </Route>
          </Switch>
          <Switch>
            <Route path="/edit-student/:email">
              <EditStudent />
            </Route>
          </Switch>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
