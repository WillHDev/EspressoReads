import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/AboutPage.css";
import "../App.css";

export class AboutPage extends Component {
  render() {
    return (
      <div className="about-page">
        <h3>Creating a New Entry</h3>
        <div className="flex">
          <div className="instruction">
            <p>Click New</p>
          </div>
          <br />
          <div className="image-container">
            <img className="about-image image-two" src="/images/bookGrid.png" />
          </div>
          <div className="instruction">
            <p>Search by Book or Author</p>
          </div>
          <div className="image-container">
            <img
              className="about-image image-two"
              src="/images/bookSearch.png"
            />
          </div>

          <div className="instruction">
            <p>Double Tap/Click Your Book</p>
          </div>

          <div>
            <img
              className="about-image image-two"
              src="/images/newEntrySelected.png"
            />
          </div>
          <div className="instruction">
            <p>Click Add Nugget</p>
            <br />
            <p>Enter the pages and an optional description</p>
          </div>
          <div className="image-container">
            <img
              className="about-image image-two"
              src="/images/addNuggets.png"
            />
          </div>
          <div>
            <img
              className="about-image image-two"
              src="/images/enteringNuggetData.png"
            />
          </div>

          <div className="instruction">
            <p>Click Submit</p>
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

export default withRouter(AboutPage);
