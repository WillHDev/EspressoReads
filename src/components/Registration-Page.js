import React from 'react';
import { connect } from 'react-redux';
import RegistrationForm from './Registration-Form';
import { Redirect } from 'react-router-dom';


export function RegistrationPage(props) {
//   if (props.loggedIn) {
//     return <Redirect to="/dashboard" />;
//   }
  return (
       
    <div className="container">
      <div className="form-container">
   
          <h1>Join Goodtimes</h1>
          <p>Create an account, create events, invite your friends and more!</p>
       
        <RegistrationForm errorMessage={props.errorMessage}/>
      </div>
    </div>
        
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  errorMessage: state.auth.error
});

export default connect(mapStateToProps)(RegistrationPage);