import React, { Component } from 'react';
//import { EventList } from './UserEvents/EventList';
import { connect } from 'react-redux';
//import {MdAddCircleOutline} from 'react-icons/lib/md';
//import '../styles/Dashboard.css';
import {Link, Redirect, withRouter} from 'react-router-dom';
import { fetchUserBooks} from '../actions/Protected-Data';
import Booklist from './Book-List';
import HeaderBar from './Header-Bar';


export class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      display: true
    };
  }

  componentWillMount(){
    this.props.dispatch(fetchUserBooks());
  }

render(){

console.log(this.props.userBooks);
if(this.props.loggedIn){
    return (
<div className="dashboard-wrapper">
<HeaderBar />
<h1>Welcome to Head Shuttle</h1>
<Booklist loading={this.props.loading} userBooks={this.props.userBooks} dispatch={this.props.dispatch}/>
</div>


    );
} else {
        return <Redirect to='/' />
    }
}

}

export const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser,
    userBooks: state.auth.userBooks,
    loading: state.auth.loading
  });
  
  export default withRouter(connect(mapStateToProps)(Dashboard));
  