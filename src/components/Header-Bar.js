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
  searchBooks = e => {
    // this.setState({
    //   searchTerm: e.target.value
    // });
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
                    type="text"
                    id="search"
                    placeholder="Search"
                    onChange={this.props.searchFilter}
                  />
                  <br />
                </a>

                <a className="almanac" onClick={this.openForm}>
                  New
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
