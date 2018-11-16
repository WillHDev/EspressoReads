import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import "../styles/HeaderBar.css";
import { fetchSharedBooks } from "../actions/Shared-Books";
import {
  changeCurrentUser,
  fetchProtectedData
} from "../actions/Protected-Data";

export class HeaderBar extends Component {
  state = {
    searchTerm: ""
  };

  componentWillMount() {
    if (localStorage.getItem("authToken")) {
      this.props.dispatch(fetchSharedBooks());
      this.props.dispatch(fetchProtectedData());
    } else {
      return;
    }
  }
  openForm = () => {
    this.props.history.push("/newbook");
  };

  logOut = () => {
    localStorage.removeItem("authToken");
    this.props.dispatch(changeCurrentUser(null));
  };
  backToBooklist = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    let searchBar, backButton;

    if (this.props.location.pathname === "/dashboard") {
      searchBar = (
        <a className="almanac almanac-left cursor">
          <input
            className="search-bar-main round cursor"
            type="text"
            id="search"
            placeholder="Search"
            onChange={this.props.searchFilter}
          />
          <br />
        </a>
      );
    }

    if (this.props.location.pathname !== "/dashboard") {
      backButton = (
        <a
          className="almanac cursor almanac-new"
          onClick={() => this.backToBooklist()}
        >
          Back
        </a>
      );
    }
    return (
      <div>
        <div className="nav-bar">
          <div className="wrapper">
            <div className="top-bar">
              <div className="second-bar">
                <nav className="main-nav">
                  <a
                    className="almanac almanac-new cursor"
                    onClick={this.openForm}
                  >
                    New
                  </a>
                  {backButton}
                  {searchBar}
                  <h1 className="nuclei">Espresso Reads</h1>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: localStorage.getItem("authToken") !== null
});

export default withRouter(connect(mapStateToProps)(HeaderBar));
