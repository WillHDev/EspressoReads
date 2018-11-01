import React from "react";
import { FaDivide } from "react-icons/fa";
import Comment from "./Comment";

export default class Comments extends React.Component {
  render() {
    let commentsDisplay;
    if (this.props.comments) {
      commentsDisplay = this.props.comments.map(comment => {
        return <Comment key={comment.id} comment={comment} />;
      });
    }
    return (
      <div>
        <ul>{commentsDisplay} </ul>
      </div>
    );
  }
}

// return (
//     <div>
//         <span>{</span>
//         <p></p>
//     </div>
// )
