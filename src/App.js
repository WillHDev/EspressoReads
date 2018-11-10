import React, { Component } from "react";
import logo from "./logo.svg";
import coffeewhite from "./images/coffeewhite.svg";
import "./App.css";
import { connect } from "react-redux";
import {
  changeCurrentUser,
  fetchProtectedData
} from "./actions/Protected-Data";

import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./components/Landing-Page";
import Dashboard from "./components/Dashboard";
import RegistrationPage from "./components/Registration-Page";
import NewBookContainer from "./components/New-Book-Container";
import BookPage from "./components/Book-Page";
import GetStarted from "./components/Get-Started";
import { fetchSharedBooks } from "./actions/Shared-Books";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToLogin: false
    };
  }

  componentWillMount() {
    this.setState({
      goToLogin: false
    });

    if (localStorage.getItem("authToken")) {
      this.props.dispatch(fetchSharedBooks());
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
  logOut = () => {
    localStorage.removeItem("authToken");
    this.props.dispatch(changeCurrentUser(null));
  };
  backToDashboard = () => {
    return this.props.history.push("/dashboard");
  };

  render() {
    if (this.state.goToLogin === true) {
      return <Redirect to="/login" />;
    }
    //"/src/images/coffee4.png"

    let homeButton;
    if (this.props.loggedIn) {
      homeButton = (
        <p>
          <a onClick={this.backToDashboard}> Home </a>
        </p>
      );
    }
    //  {homeButton}
    //
    return (
      <div className="App">
        <a className="logout-button" onClick={this.logOut}>
          Logout
        </a>
        <h1 className="nuclei">
          <span className="big-e">E</span>spresso Reads
        </h1>
        <img src={coffeewhite} className="logo" alt="logo" />

        <div>
          <Route exact path="/" component={GetStarted} />
          <Route exact path="/login" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/newbook" component={NewBookContainer} />
          <Route path="/book/:id" component={BookPage} />
        </div>
      </div>
    );
  }
}
//export default App;
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
  //router:state.router
});

export default withRouter(connect(mapStateToProps)(App));
