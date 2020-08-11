import React from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment, Button, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import UserContext from "../context/UserContext";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      adminEmail: "",
      password: "",
      inputError: false,
      loginError: false, //{ message: "error" },
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.adminEmail && this.state.password) {
      const { adminEmail, password } = this.state;
      const admin = {
        email: adminEmail,
        password: password,
      };
      Axios.post("http://127.0.0.1:5000/admin/login", admin)
        .then((res) => {
          this.context.setUser(res.data);
        })
        .then(() => this.props.history.push("/admin-dashboard"));
    }
  }

  render() {
    const notValid = this.state.adminEmail === "" || this.state.password === "";
    return (
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <h2>Admin Login</h2>
        <form>
          <Grid item>
            <TextField
              className="m-3"
              required
              onChange={(event) =>
                this.setState({ adminEmail: event.target.value })
              }
              label="Admin Email"
              defaultValue={this.state.adminEmail}
              variant="outlined"
              type="email"
              error={this.state.inputError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faUser} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              className="m-3"
              required
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              label="Password"
              defaultValue={this.state.password1}
              variant="outlined"
              type="password"
              error={this.state.inputError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLock} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Button
              className="m-3"
              disabled={notValid}
              onClick={this.handleSubmit}
              type="submit"
              variant="outlined"
            >
              Submit
            </Button>
          </Grid>
        </form>
        {this.state.loginError && (
          <Alert variant="outlined" severity="error">
            <span>{this.state.loginError.message}</span>
          </Alert>
        )}
      </Grid>
    );
  }
}

export default withRouter(Login);
Login.contextType = UserContext;
