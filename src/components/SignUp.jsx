import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import UserContext from "../context/UserContext";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  adminEmail: "",
  password1: "",
  password2: "",
  errorName: false,
  errorEmail: false,
  errorPassword: false,
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    this.validateInput();
    if (
      !this.state.errorName &&
      !this.state.errorEmail &&
      !this.state.errorPassword
    ) {
      const { firstName, lastName, adminEmail, password1 } = this.state;
      const admin = {
        first_name: firstName,
        last_name: lastName,
        email: adminEmail,
        password: password1,
      };
      Axios.post("http://127.0.0.1:5000/admin", admin);
      this.context.setUser(admin);
      this.props.history.push("/admin-dashboard");
    }
  }

  render() {
    const valid =
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.email === "";
    return (
      <>
        <h2>Admin SignUp</h2>
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
              this.setState({ adminEmail: event.target.value })
            }
            label="Admin Email"
            defaultValue={this.state.adminEmail}
            variant="outlined"
            type="email"
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
          <Button
            disabled={valid}
            onClick={this.handleSubmit}
            type="submit"
            variant="outlined"
          >
            Submit
          </Button>
        </form>
      </>
    );
  }
}

export default withRouter(SignUp);
SignUp.contextType = UserContext;
