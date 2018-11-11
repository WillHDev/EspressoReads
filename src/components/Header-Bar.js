import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeCurrentUser } from "../actions/Protected-Data";
import { FaSearch } from "react-icons/fa";
import "../styles/HeaderBar.css";

export class HeaderBar extends Component {
  state = {
    searchTerm: ""
  };
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
        <a className="almanac almanac-left">
          <input
            className="search-bar-main"
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
          className="almanac almanac-new"
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
                  <a className="almanac almanac-new" onClick={this.openForm}>
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
