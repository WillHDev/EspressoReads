import React, { Component } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NewBookFormContainer from "./New-Book-Form-Container";
import HeaderBar from "./Header-Bar";
import { FaDivide } from "react-icons/fa";

export class NewBookContainer extends Component {
  backToBooklist = () => {
    this.props.history.push("/dashboard");
  };

  //
  //<a onClick={() => this.backToBooklist()}>Back</a>
  render() {
    if (this.props.loggedIn) {
      return (
        <div className="new-book-container">
          <HeaderBar />

          <div className="book-search-box-upper">
            <h2 className="new-entry">New Entry</h2>
            <NewBookFormContainer />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
  //router:state.router
});

export default withRouter(connect(mapStateToProps)(NewBookContainer));
