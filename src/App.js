import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import  {fetchProtectedData} from './actions/Protected-Data';
import {withRouter, Switch, Route, Redirect } from 'react-router-dom'
import  LandingPage  from './components/Landing-Page';
import Dashboard from './components/Dashboard';
import RegistrationPage from './components/Registration-Page';

class App extends Component {

  componentWillMount(){
    if(localStorage.getItem('authToken')){
       this.props.dispatch(fetchProtectedData());
    } else {
      return;
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Charles can Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          
            Learn React
          </a>
        </header>
        
   
          <div>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard"  component={Dashboard}/>
            <Route exact path="/registration" component={RegistrationPage}/>
          </div>
    
      </div>
    );
  }
}
//export default App;
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  //router:state.router

});

export default withRouter(connect(mapStateToProps)(App));



