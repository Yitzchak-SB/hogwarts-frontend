import React from "react";
import {
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AddSkill from "./AddSkill";
import Axios from "axios";
import UserContext from "../context/UserContext";

class AddStudent extends React.Component {
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
    this.validateInput = this.validateInput.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      addExist: false,
      addDesire: false,
      activeSkills: [],
      desiredSkills: [],
      skill: false,
      level: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateInput();
    if (
      !this.state.errorName &&
      !this.state.errorEmail &&
      !this.state.errorPassword
    ) {
      const {
        firstName,
        lastName,
        email,
        activeSkills,
        desiredSkills,
        password1,
      } = this.state;
      const student = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password1,
        existing_magic_skills: activeSkills,
        desired_magic_skills: desiredSkills,
      };
      Axios.post("http://127.0.0.1:5000/student", {
        data: {
          admin: this.context.user,
          student: student,
        },
      }).then(() => {
        this.props.history.push("/admin-dashboard");
        this.context.updateStudents();
      });
    }
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

  validateInput() {
    const {
      firstName,
      lastName,
      adminEmail,
      password1,
      password2,
    } = this.state;
    if (firstName === "" || lastName === "")
      this.setState((state) => {
        return { errorName: true };
      });
    if (adminEmail === "")
      this.setState((state) => {
        return { errorEmail: true };
      });
    if (password1 !== password2)
      this.setState((state) => {
        return { errorPassword: true };
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
        <h2>Add Student</h2>
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
            onChange={(event) => this.setState({ email: event.target.value })}
            label="Email"
            defaultValue={this.state.email}
            variant="outlined"
            type="email"
            error={this.state.errorPassword}
          />
          <TextField
            onChange={(event) =>
              this.setState({ password1: event.target.value })
            }
            label="Password"
            defaultValue={this.state.password1}
            variant="outlined"
            type="password"
            helperText="Most Be At Least 8 Characters"
            error={this.state.errorPassword}
          />
          <TextField
            onChange={(event) =>
              this.setState({ password2: event.target.value })
            }
            label="Confirm Your Password"
            defaultValue={this.state.password2}
            variant="outlined"
            type="password"
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
    );
  }
}

export default withRouter(AddStudent);
AddStudent.contextType = UserContext;
