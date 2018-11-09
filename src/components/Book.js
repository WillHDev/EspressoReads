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
import { Nuggets } from "./Nuggets";

export class Book extends React.Component {
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
    const { book } = this.props;
    const {
      title,
      author,
      subtitle,
      id,
      image,
      votes,
      description,
      nuggets
    } = this.props.book;

    let nuggetsDisplay, toggleInfo;
    if (this.props.book.nuggets) {
      nuggetsDisplay = <Nuggets nuggets={nuggets} />;
    }
    if (this.props.description !== "") {
      toggleInfo = <ToggleInfo info={description} />;
    }
    let voteButtons;
    //   <span className="float-right">UpVotes:</span>
    if (this.props.singleView) {
      voteButtons = (
        <div className="votes">
          {votes}
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
      <div className="">
        <div className="info">
          {" "}
          <h4 className="single-book-title">{title}</h4>
          <h6>{author}</h6>
          {toggleInfo}
        </div>

        <img
          className="book-image"
          src={image}
          id={id}
          onClick={this.props.onClick}
        />
        <ul>{nuggetsDisplay}</ul>
        {voteButtons}
        <Toggle>
          {({ on, toggle }) => (
            <div>
              {!on && <a onClick={toggle}>Comments</a>}
              {on && (
                <div>
                  <FaArrowCircleUp onClick={toggle} />

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

export default withRouter(connect(mapStateToProps)(Book));
