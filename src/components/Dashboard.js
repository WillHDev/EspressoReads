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
      singleBook: null,
      searchTerm: ""
    };
  }

  componentWillMount() {
    this.setState({ sharedBooks: this.props.sharedBooks });
  }

  filterResults(searchTerm) {
    this.setState({ filterBooks: searchTerm });
  }
  searchFilter = e => {
    e.preventDefault();
    const caseInsensitive = e.target.value.toUpperCase();
    this.setState({ searchTerm: caseInsensitive });
  };
  render() {
    let display;

    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    } else if (!this.props.sharedBooks) {
      return <h2> Loading...</h2>;
    } else {
      let filteredBooks;
      if (this.state.searchTerm !== "") {
        filteredBooks = this.props.sharedBooks.filter(book => {
          let uppercaseTitle = book.title.toUpperCase();
          return uppercaseTitle.includes(this.state.searchTerm);
        });
      } else {
        filteredBooks = this.props.sharedBooks;
      }
      display = (
        <Booklist
          loading={this.props.loading}
          sharedBooks={filteredBooks}
          dispatch={this.props.dispatch}
        />
      );
    }

    return (
      <div className="dashboard-wrapper">
        <HeaderBar searchFilter={this.searchFilter} />

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
