import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {changeCurrentUser} from '../actions/Protected-Data';
import { FaSearch } from 'react-icons/fa';
//import Button from './Button';


export class HeaderBar extends Component {

    logOut = () => {
      localStorage.removeItem('authToken');
      this.props.dispatch(changeCurrentUser(null));
  
    }
  openForm = () => {
    this.props.history.push('/newbook');
  }
    render(){
      return (
<div className="nav-bar">
<FaSearch
          className="search-icon"
          //onClick={this.}
        />
      
<input type="text" id="search" placeholder="Enter a serach term and 
hit enter" /><br/>
<button onClick={this.openForm} >New</button>
<button onClick={this.logOut}>Logout</button>
</div>
      )
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
  });
  
  
  export default withRouter(connect(mapStateToProps)(HeaderBar));
  