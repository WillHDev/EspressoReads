import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/AboutPage.css";
import "../App.css";

export class AboutPage extends Component {
  backToBooklist = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="about-page">
        <br />
        <h3 className="creating-new-entry">Creating a New Entry</h3>
        <div className="flex">
          <div className="instruction">
            <p>Click 'New'</p>
          </div>

          <div className="image-container">
            <img className="about-image image-two" src="/images/bookGrid.png" />
          </div>
          <div className="instruction">
            <p>Search by book or author</p>
          </div>
          <div className="image-container">
            <img
              className="about-image image-two"
              src="/images/bookSearch.png"
            />
          </div>

          <div className="instruction">
            <p>Double tap/click your book</p>
          </div>

          <div>
            <img
              className="about-image image-two"
              src="/images/newEntrySelected.png"
            />
          </div>
          <div className="instruction">
            <p>Click 'Add Nugget'</p>
          </div>
          <div className="image-container">
            <img
              className="about-image image-two"
              src="/images/addNuggets.png"
            />
          </div>
          <div className="instruction">
            <p>Enter the pages and an optional description</p>
          </div>
          <div>
            <img
              className="about-image image-two"
              src="/images/enteringNuggetData.png"
            />
          </div>

          <div className="instruction">
            <p>Click 'Submit' to serve up your book espresso</p>
          </div>
          <div>
            <img
              className="about-image image-two"
              src="/images/nuggetsAndComments.png"
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
  //router:state.router
});

export default withRouter(connect(mapStateToProps)(AboutPage));
