import React, { Component } from "react";
import { LoginForm } from "./Login-Form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import RegistrationPage from "./Registration-Page";
export class LandingPage extends Component {
  handleSubmit = () => {
    this.props.history.push("/registration");
  };
  render() {
    if (this.props.loading) {
      return <h1>loading...</h1>;
    }
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="container landing-container">
        <h3>Welcome </h3>
        <div className="login-container container">
          <LoginForm />
          <button onClick={this.handleSubmit}>Create an Account</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
