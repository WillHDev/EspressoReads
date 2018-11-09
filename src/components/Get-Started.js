import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { connect } from "react-redux";
import { fetchProtectedData } from "../actions/Protected-Data";
import { login } from "../actions/Auth";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./Landing-Page";
import Dashboard from "./Dashboard";
import RegistrationPage from "./Registration-Page";
import NewBookForm from "./New-Book-Container";
import "../styles/GetStarted.css";

class GetStarted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToLogin: false
    };
  }

  componentWillMount() {
    this.setState({
      godToLogin: false
    });

    if (localStorage.getItem("authToken")) {
      this.props.dispatch(fetchProtectedData());
    } else {
      return;
    }
  }

  goToLogin = () => {
    this.setState({
      goToLogin: true
    });
  };
  goToRegistration = () => {
    this.props.history.push("/registration");
  };
  demoLogin = () => {
    this.props.dispatch(login("gatsby", "password12"));
  };
  render() {
    if (this.state.goToLogin === true) {
      return <Redirect to="/login" />;
    } else if (this.props.loggedIn === true) {
      this.props.history.push("/dashboard");
    }
    return (
      <div className="App">
        <header className="App-header">
          <p className="Insight about">Strong Reads Brewed Daily</p>
          <br />
          <br />
          <p className="App-link" onClick={() => this.goToLogin()}>
            Login
          </p>
          <br />
          <div className="accounts">
            {" "}
            <a
              className="demo-login-link account"
              onClick={() => this.goToRegistration()}
            >
              Create an Account
            </a>
            <br />
            <a
              className="demo-login-link account"
              onClick={() => this.demoLogin()}
            >
              Use Demo Account
            </a>{" "}
          </div>
        </header>
      </div>
    );
  }
}
//export default App;
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
  //router:state.router
});

export default withRouter(connect(mapStateToProps)(GetStarted));
