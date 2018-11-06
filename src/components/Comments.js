import React from "react";
import { FaDivide } from "react-icons/fa";
import Comment from "./Comment";
import { addComment } from "../actions/Comment";
import { connect } from "react-redux";

export class Comments extends React.Component {
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
    console.log("handleSubmit hit in comments");
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
  };

  updateCommentState = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const userId = this.props.currentUser.id;

    // let commentsDisplay;
    // <ul>{commentsDisplay} </ul>
    // if (this.props.book.comments) {
    //   commentsDisplay = this.props.book.comments.map(comment => {
    //     return <Comment key={comment.id} comment={comment} />;
    //   });
    // }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment:
            <input
              placeholder="add a comment"
              value={this.state.comment}
              onChange={this.updateCommentState}
              type="text"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Comments);
