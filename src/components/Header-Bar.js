import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {changeCurrentUser} from '../actions/Protected-Data';

//import Button from './Button';


export class HeaderBar extends Component {

    logOut() {
      localStorage.removeItem('authToken');
      this.props.dispatch(changeCurrentUser(null));
  
    }
  
    render(){
      return (
<div className="nav-bar">
<button onClick={this.logout}>Logout</button>
</div>
      )
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
  });
  
  
  export default withRouter(connect(mapStateToProps)(HeaderBar));
  