import React, { Component } from "react";
import logo from "./logo.svg";

import "./App.css";
import { connect } from "react-redux";
import { fetchProtectedData } from "./actions/Protected-Data";
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

  backToDashboard = () => {
    return this.props.history.push("/dashboard");
  };

  render() {
    if (this.state.goToLogin === true) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="App">
        <img src="/src/images/coffee4.png" className="App-logo" alt="logo" />
        <p>
          <a onClick={this.backToDashboard}> Home </a>
        </p>

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
