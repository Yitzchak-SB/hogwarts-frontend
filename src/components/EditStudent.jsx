import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import AddSkill from "./AddSkill";
import UserContext from "../context/UserContext";
import Axios from "axios";

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.submitExistSkill = this.submitExistSkill.bind(this);
    this.submitDesireSkill = this.submitDesireSkill.bind(this);
    this.handleExist = this.handleExist.bind(this);
    this.handleDesire = this.handleDesire.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: null,
      firstName: "",
      lastName: "",
      email: "",
      addExist: false,
      addDesire: false,
      activeSkills: [],
      desiredSkills: [],
      skill: false,
      level: false,
    };
  }

  componentDidMount() {
    const email = this.props.match.params.email;
    const userArray = this.context.students.filter(
      (student) => student._email === email
    );
    let user = null;
    if (userArray) {
      user = userArray[0];
      this.setState({
        user: user,
        firstName: user._first_name,
        lastName: user._last_name,
        email: user._email,
        desiredSkills: user._desired_magic_skills,
        activeSkills: user._existing_magic_skills,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      activeSkills,
      desiredSkills,
    } = this.state;
    const student_data = {
      data: {
        id: this.state.user._id,
        password: this.state.user._password,
        first_name: firstName,
        last_name: lastName,
        email: email,
        existing_magic_skills: activeSkills,
        desired_magic_skills: desiredSkills,
      },
      initial_email: this.state.user._email,
    };
    Axios.post("http://127.0.0.1:5000/student/edit", student_data).then(() => {
      this.props.history.push("/admin-dashboard");
      this.context.updateStudents();
    });
  }

  handleExit() {
    this.setState({
      addExist: false,
      addDesire: false,
      skill: false,
      level: false,
    });
  }

  handleExist() {
    this.setState({ addExist: true });
  }

  handleDesire() {
    this.setState({ addDesire: true });
  }

  handleSkillChange(event) {
    this.setState({ skill: event.target.value });
  }

  handleLevelChange(event) {
    this.setState({ level: event.target.value });
  }

  submitExistSkill(event) {
    event.preventDefault();
    const skill = {
      [this.state.skill]: { name: this.state.skill, level: this.state.level },
    };
    this.setState((state) => {
      return {
        addExist: false,
        addDesire: false,
        activeSkills: [...state.activeSkills, skill],
        skill: false,
        level: false,
      };
    });
  }

  submitDesireSkill(event) {
    event.preventDefault();
    const skill = {
      [this.state.skill]: { name: this.state.skill, level: this.state.level },
    };
    this.setState((state) => {
      return {
        addExist: false,
        addDesire: false,
        desiredSkills: [...state.desiredSkills, skill],
        skill: false,
        level: false,
      };
    });
  }

  render() {
    const valid =
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.email === "";
    return (
      <>
        {" "}
        {this.state.user && (
          <>
            <h1>
              Edit {this.state.user._first_name} {this.state.user._last_name}
            </h1>
            <form>
              <TextField
                required
                onChange={(event) =>
                  this.setState({ firstName: event.target.value })
                }
                label="First Name"
                defaultValue={this.state.firstName}
                variant="outlined"
              />
              <TextField
                required
                onChange={(event) =>
                  this.setState({ lastName: event.target.value })
                }
                label="Last Name"
                defaultValue={this.state.lastName}
                variant="outlined"
              />
              <TextField
                required
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
                label="Email"
                defaultValue={this.state.email}
                variant="outlined"
                type="email"
                error={this.state.errorPassword}
              />
              {!this.state.addExist && !this.state.addDesire && (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Add Skill</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.addExist}
                          onClick={this.handleExist}
                        />
                      }
                      label="Existing Skill"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.addDesire}
                          onClick={this.handleDesire}
                        />
                      }
                      label="Desired Skill"
                    />
                  </FormGroup>
                </FormControl>
              )}
              <Button
                disabled={valid}
                onClick={this.handleSubmit}
                type="submit"
                variant="outlined"
              >
                Submit
              </Button>
            </form>
            {this.state.addExist && (
              <AddSkill
                exist={true}
                skill={this.state.skill}
                level={this.state.level}
                handleSkillChange={this.handleSkillChange}
                submitExistSkill={this.submitExistSkill}
                handleLevelChange={this.handleLevelChange}
                submitDesireSkill={this.submitDesireSkill}
                handleExit={this.handleExit}
              />
            )}
            {this.state.addDesire && (
              <AddSkill
                exist={false}
                skill={this.state.skill}
                level={this.state.level}
                handleSkillChange={this.handleSkillChange}
                submitExistSkill={this.submitExistSkill}
                handleLevelChange={this.handleLevelChange}
                submitDesireSkill={this.submitDesireSkill}
                handleExit={this.handleExit}
              />
            )}
          </>
        )}
        <Link to="/admin-dashboard">Back To Dashboard</Link>
      </>
    );
  }
}

export default withRouter(EditStudent);
EditStudent.contextType = UserContext;
