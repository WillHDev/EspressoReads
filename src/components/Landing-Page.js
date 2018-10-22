import React, { Component } from 'react';
import { LoginForm } from './Login-Form';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import RegistrationPage from './Registration-Page';
export class LandingPage extends Component {
    state = {
        toRegistration: false,
      }
      handleSubmit = () => {
      this.setState(() => ({
            toRegistration: true
          }))
      }
    render(){ 
    if(this.props.loading){
        return <h1>loading...</h1>;
      }
      if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
      }
      if (this.state.toRegistration === true) {
        return <Redirect to='/registration' />
      }
  

    return (
    <div className="container landing-container">
<h1>Welcome to Thought Challenger</h1>
<div className="login-container container">
<LoginForm />
<button onClick={this.handleSubmit}>Create an Account
</button>


</div>

    </div>
    )
    }
}

const mapStateToProps = state => ({
 loggedIn: state.auth.currentUser !== null
  });
  
  export default connect(mapStateToProps)(LandingPage);