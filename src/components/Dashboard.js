import React, { Component } from "react";
//import { EventList } from './UserEvents/EventList';
import { connect } from "react-redux";
//import {MdAddCircleOutline} from 'react-icons/lib/md';
//import '../styles/Dashboard.css';
import { Link, Redirect, withRouter } from "react-router-dom";
import { fetchUserBooks } from "../actions/Protected-Data";
import Booklist from "./Book-List";
import HeaderBar from "./Header-Bar";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      searchTerm: null
    };
  }

  componentWillMount() {
    //this.props.dispatch(fetchUserBooks());
  }

  filterResults(searchTerm) {
    this.setState({ filterBooks: searchTerm });
  }

  render() {
    console.log("token???", localStorage.getItem("authToken"));
    if (this.props.loggedIn) {
      return (
        <div className="dashboard-wrapper">
          <HeaderBar />

          <h1 className="nuclei">Your Nuclei</h1>
          <br />
          <br />
          <Booklist
            loading={this.props.loading}
            sharedBooks={this.props.sharedBooks}
            dispatch={this.props.dispatch}
          />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export const mapStateToProps = state => ({
  loggedIn: localStorage.getItem("authToken") !== null,
  currentUser: state.auth.currentUser,
  userBooks: state.auth.userBooks,
  loading: state.auth.loading,
  sharedBooks: state.sharedBooks.sharedBooks
});

export default withRouter(connect(mapStateToProps)(Dashboard));
