import React from "react";
import ToggleInfo from "./partials/Toggle-Info";
import Toggle from "./partials/Toggle";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { changeVote } from "../actions/Votes";
import { connect } from "react-redux";
import "../styles/Book.css";
import { withRouter } from "react-router-dom";
import AddComment from "./Add-Comment";

export class BookAll extends React.Component {
  upVote = event => {
    const bookId = event.currentTarget.id;
    const voteAction = {};
    voteAction.voteAction = "up";
    this.props.dispatch(changeVote(bookId, voteAction));
  };
  downVote = event => {
    const bookId = event.currentTarget.id;
    const voteAction = {};
    voteAction.voteAction = "down";
    this.props.dispatch(changeVote(bookId, voteAction));
  };

  render() {
    const {
      title,
      author,

      id,
      image,
      votes,
      description
    } = this.props.book;

    let toggleInfo;

    if (this.props.description !== "") {
      toggleInfo = <ToggleInfo info={description} />;
    }
    let voteButtons;
    //    {votes}
    if (this.props.singleView) {
      voteButtons = (
        <div className="votes">
          <div
            onClick={e => this.upVote(e)}
            ref="btn"
            id={id}
            className="float-right thumbs"
          >
            <FaThumbsUp id={id} />
          </div>
          <div
            onClick={e => this.downVote(e)}
            ref="btn"
            id={id}
            className="float-right thumbs"
          >
            <FaThumbsDown id={id} />
          </div>
        </div>
      );
    }
    return (
      <div className="book-card">
        <div className="info">
          {" "}
          <h4>{title}</h4>
          <h6>{author}</h6>
          {toggleInfo}
        </div>

        <img
          className="book-image"
          src={image}
          id={id}
          onClick={this.props.onClick}
        />

        {voteButtons}
        <Toggle>
          {({ on, toggle }) => (
            <div>
              {!on && (
                <a
                  className="description-toggle-book-all cursor"
                  onClick={toggle}
                >
                  Comments
                </a>
              )}
              {on && (
                <div>
                  <FaArrowCircleUp className="cursor" onClick={toggle} />

                  <AddComment book={this.props.book} />
                </div>
              )}
            </div>
          )}
        </Toggle>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(BookAll));
