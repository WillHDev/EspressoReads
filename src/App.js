import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter, Switch, Route, Redirect } from 'react-router-dom'
import  LandingPage  from './components/Landing-Page';
class App extends Component {
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
            <Route exact path="/landingpage" component={LandingPage} />
          </div>
    
      </div>
    );
  }
}

export default App;
