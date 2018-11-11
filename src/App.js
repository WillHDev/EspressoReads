import React, { Component } from "react";
import logo from "./logo.svg";
import coffeewhite from "./components/elements/coffeewhite.svg";
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
import AboutPage from "./components/AboutPage";

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

  aboutPage = () => {
    this.props.history.push("/aboutPage");
  };
  backToDashboard = () => {
    return this.props.history.push("/dashboard");
  };

  render() {
    let backButton, logoutButton, logoBox;
    if (this.state.goToLogin === true) {
      return <Redirect to="/login" />;
    }

    if (this.props.location.pathname === "/aboutPage") {
      backButton = (
        <a className="logout-button" onClick={this.backToDashboard}>
          Back
        </a>
      );
    }

    logoBox = (
      <div className="logo-box-get-started">
        <img src={coffeewhite} className="logo-get-started" alt="logo" />
      </div>
    );
    if (this.props.location.pathname !== "/") {
      logoutButton = (
        <a className="logout-button" onClick={this.logOut}>
          Logout
        </a>
      );
      logoBox = (
        <div className="logo-box">
          <img src={coffeewhite} className="logo" alt="logo" />
        </div>
      );
    }
    return (
      <div className="App">
        <header className="header-about-logout">
          {logoutButton}
          <br />
          <a className="logout-button about-next" onClick={this.aboutPage}>
            About
          </a>
          <br />
          {backButton}
        </header>
        {logoBox}
        <br />
        <div>
          <Route exact path="/" component={GetStarted} />
          <Route exact path="/login" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/newbook" component={NewBookContainer} />
          <Route path="/book/:id" component={BookPage} />
          <Route exact path="/aboutPage" component={AboutPage} />
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
