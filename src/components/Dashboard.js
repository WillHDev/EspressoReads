import React, { Component } from "react";
//import { EventList } from './UserEvents/EventList';
import { connect } from "react-redux";
//import {MdAddCircleOutline} from 'react-icons/lib/md';
//import '../styles/Dashboard.css';
import { Link, Redirect, withRouter } from "react-router-dom";
import { fetchUserBooks } from "../actions/Protected-Data";
import Booklist from "./Book-List";
import HeaderBar from "./Header-Bar";
import BookPage from "./Book-Page";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      searchTerm: null,
      singleBook: null
    };
  }

  componentWillMount() {
    //this.props.dispatch(fetchUserBooks());
  }

  filterResults(searchTerm) {
    this.setState({ filterBooks: searchTerm });
  }

  render() {
    let display;

    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    } else if (!this.props.sharedBooks) {
      return <h2> Loading...</h2>;
    } else {
      // if (this.props.viewBook.id !== "") {
      //   display = <BookPage book={this.state.singleBook} />;
      // } else {
      display = (
        <Booklist
          loading={this.props.loading}
          sharedBooks={this.props.sharedBooks}
          dispatch={this.props.dispatch}
        />
      );
    }

    return (
      <div className="dashboard-wrapper">
        <HeaderBar />

        <h1 className="nuclei">Espresso Reads</h1>
        <br />
        <br />

        {display}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  loggedIn: localStorage.getItem("authToken") !== null,
  currentUser: state.auth.currentUser,
  userBooks: state.auth.userBooks,
  loading: state.auth.loading,
  sharedBooks: state.sharedBooks.sharedBooks,
  viewBook: state.viewBook
});

export default withRouter(connect(mapStateToProps)(Dashboard));
