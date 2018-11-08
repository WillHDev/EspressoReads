import React from "react";
import { connect } from "react-redux";
import RegistrationForm from "./Registration-Form";
import { Redirect } from "react-router-dom";

export class RegistrationPage extends React.Component {
  backToDash = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="container">
        <a onClick={this.backToDash}>Back</a>
        <div className="form-container">
          <h1>Join Expresso Reads</h1>
          <p>
            Create an account, find great reads, and share your own Book
            Espresso with others!{" "}
          </p>

          <RegistrationForm errorMessage={this.props.errorMessage} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  errorMessage: state.auth.error
});

export default connect(mapStateToProps)(RegistrationPage);
