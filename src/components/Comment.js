import React from "react";
import { FaDivide } from "react-icons/fa";
import { connect } from "react-redux";
import { addComment } from "../actions/Comment";
export class Comment extends React.Component {
  render() {
    const { comments } = this.props;

    let commentsDisplay;
    commentsDisplay = comments.map(comment => {
      return (
        <div className="comment-box book-card2" key={comment.id}>
          <div className="comment-text">{comment.text}</div>
          <div className="author-comment">{comment.author}</div>
        </div>
      );
    });

    return (
      <div className="comments-container grid2">
        <a onClick={this.addComment}>Add Comment</a>
        {commentsDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Comment);
