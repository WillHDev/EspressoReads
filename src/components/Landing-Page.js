import React, { Component } from 'react';
import { LoginForm } from './Login-Form';
import { connect } from 'react-redux';
import RegistrationPage from './Registration-Page';
export class LandingPage extends Component {
    render(){ 
    return (
    <div className="container landing-container">
<h1>Welcome to Thought Challenger</h1>
<div className="login-container container">
<LoginForm />
<RegistrationPage />
</div>

    </div>
    )
    }
}

const mapStateToProps = state => ({
 loggedIn: state.currentUser !== null
  });
  
  export default connect(mapStateToProps)(LandingPage);