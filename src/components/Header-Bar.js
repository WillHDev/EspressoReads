import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeCurrentUser } from "../actions/Protected-Data";
import { FaSearch } from "react-icons/fa";
//import Button from './Button';

export class HeaderBar extends Component {
  logOut = () => {
    localStorage.removeItem("authToken");
    this.props.dispatch(changeCurrentUser(null));
  };
  openForm = () => {
    this.props.history.push("/newbook");
  };
  render() {
    return (
      <div className="nav-bar">
        <div className="wrapper">
          <div className="top-bar">
            <div className="second-bar">
              <nav className="main-nav">
                <a className="almanac">
                  <input
                    className="almanac"
                    type="text"
                    id="search"
                    placeholder="Search"
                  />
                  <br />
                </a>

                <a className="almanac" onClick={this.openForm}>
                  New
                </a>

                <a className="almanac" onClick={this.logOut}>
                  Logout
                </a>
              </nav>
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
