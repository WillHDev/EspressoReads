import React from "react";
import HeaderBar from "./Header-Bar";
import ToggleInfo from "./partials/Toggle-Info";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { changeVote } from "../actions/Votes";
import { connect } from "react-redux";

export class BookPage extends React.Component {
  constructor() {
    super();
    this.state = {
      voteDisable: null
    };
  }
  upVote = event => {
    this.setState({ voteDisable: true });
    const bookId = event.currentTarget.id;
    const voteAction = {};
    voteAction.voteAction = "up";
    this.props.dispatch(changeVote(bookId, voteAction));
  };
  downVote = event => {
    this.setState({ voteDisable: true });

    const bookId = event.currentTarget.id;
    const voteAction = {};
    voteAction.voteAction = "down";

    this.props.dispatch(changeVote(bookId, voteAction));
  };
  render() {
    let nuggetsDisplay;
    if (this.props.book.nuggets) {
      nuggetsDisplay = this.props.book.nuggets.map(nugget => {
        return (
          <li>
            <div>{nugget.description}</div>
            <div>{nugget.fromPage}</div>
            <div>{nugget.toPage}</div>
          </li>
        );
      });
    }
    let toggleInfo;
    if (this.props.description !== "") {
      toggleInfo = <ToggleInfo info={this.props.description} />;
    }

    const { title, author, subtitle, id, image, votes } = this.props.book;
    return (
      <div className="book-page">
        <HeaderBar />
        <div className="single-book">
          <h4>{title}</h4>
          <h6>{subtitle}</h6>
          <h6>{author}</h6>
          {votes}
          <span
            onClick={e => this.upVote(e)}
            ref="btn"
            id={id}
            disabled={this.state.voteDisable}
          >
            <FaThumbsUp id={id} />
          </span>
          <span
            onClick={e => this.downVote(e)}
            ref="btn"
            id={id}
            disabled={this.state.voteDisable}
          >
            <FaThumbsDown id={id} />
          </span>
          {toggleInfo}

          <img className="book-image" src={image} id={id} />
          <ul>{nuggetsDisplay}</ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  book: state.viewBook
});

export default connect(mapStateToProps)(BookPage);
