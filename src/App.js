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
import GetStarted from "./components/Get-Started";
class App extends Component {
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
    console.log("Hit");
    this.setState({
      goToLogin: true
    });
  };

  backToDashboard = () => {
    return <Redirect to="/dashboard" />;
  };

  render() {
    if (this.state.goToLogin === true) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={this.backToDashboard}> Nucleus </button>
        </p>

        <div>
          <Route exact path="/" component={GetStarted} />
          <Route exact path="/login" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/newbook" component={NewBookContainer} />
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
