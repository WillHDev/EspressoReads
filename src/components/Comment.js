import React from "react";
import { FaDivide } from "react-icons/fa";
import { connect } from "react-redux";
import { addComment } from "../actions/Comment";
export class Comment extends React.Component {
  state = {
    showCommentInput: false,
    comment: ""
  };
  addComment = () => {
    this.setState({
      showCommentInput: !this.state.showCommentInput
    });
  };

  updateCommentState = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const comment = this.state.value;
    //userID, book, comment location
    const { book } = this.props;
    const { userId } = this.props.currentUser;
    const commentData = {};
    Object.assign(commentData, {
      book,
      userId,
      comment
    });
    this.props.dispatch(addComment(commentData));
  };
  render() {
    let commentInputDisplay;
    if (this.state.showCommentInput) {
      commentInputDisplay = (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="add a comment"
              value={this.state.comment}
              onChange={e => this.updateCommentState(e)}
              type="text"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }

    const { comment } = this.props;
    //<span>{comment.author}</span>
    return (
      <li key={comment.id}>
        <p>{comment.text}</p>
        <a onClick={this.addComment}>Add Comment</a>
        {commentInputDisplay}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Comment);
