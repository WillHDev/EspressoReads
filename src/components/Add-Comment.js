import React from "react";

import Comment from "./Comment";
import { addComment } from "../actions/Comment";
import { connect } from "react-redux";
import "../styles/Comment.css";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

export class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };

    this.updateCommentState = this.updateCommentState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    const comment = this.state.comment;
    //userID, book, comment location
    const { book } = this.props;
    const userId = this.props.currentUser.id;
    const commentData = {};
    Object.assign(commentData, {
      book,
      userId,
      comment
    });

    this.props.dispatch(addComment(commentData));
    this.setState({ comment: "" });
  };

  updateCommentState = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    if (this.props.currentUser) {
      const userId = this.props.currentUser.id;
    } else this.props.history.push("/");

    const { comment } = this.state;

    // checks if string only contained whitespace (ie. spaces, tabs or line breaks)
    const isEnabled = comment.length > 0 && /\S/.test(comment);
    console.log(
      "this.props.viewBook.book.comments",
      this.props.viewBook.book.comments
    );
    return (
      <div className="add-comment-container">
        <Comment comments={this.props.viewBook.book.comments} />

        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              placeholder="add a comment"
              value={this.state.comment}
              onChange={this.updateCommentState}
              type="text"
              className="round"
            />
          </label>

          <input
            disabled={!isEnabled}
            type="submit"
            value="Submit"
            className="round"
          />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  viewBook: state.viewBook
});

export default withRouter(connect(mapStateToProps)(AddComment));
