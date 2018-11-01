import React from "react";
import ToggleInfo from "./partials/Toggle-Info";
import Toggle from "./partials/Toggle";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { changeVote } from "../actions/Votes";
import { connect } from "react-redux";
import { loadBookIntoSingleView } from "../actions/View-Book";
import { Redirect, withRouter } from "react-router-dom";
import Comments from "./Comments";

export class Book extends React.Component {
  upVote = event => {
    //this.refs.btn.setAttribute("disabled", "disabled");
    const bookId = event.currentTarget.id;
    const voteAction = {};
    voteAction.voteAction = "up";
    this.props.dispatch(changeVote(bookId, voteAction));
  };
  downVote = event => {
    //this.refs.btn.setAttribute("disabled", "disabled");
    const bookId = event.currentTarget.id;
    const voteAction = {};
    voteAction.voteAction = "down";

    this.props.dispatch(changeVote(bookId, voteAction));
  };
  openBook = event => {
    const bookId = event.currentTarget.id;
    //console.log("bookId!!!!", bookId);
    // const address = `/viewbook/`;
    //console.log("Address", address);
    const { book } = this.props;
    console.log("book sent from openBook", book);
    this.props.dispatch(loadBookIntoSingleView(book));
    // return <Redirect to="/viewbook" />;
    this.props.history.push("/viewbook");
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
    const {
      title,
      author,
      subtitle,
      id,
      image,
      votes,
      description
    } = this.props.book;
    if (this.props.description !== "") {
      toggleInfo = <ToggleInfo info={description} />;
    }

    return (
      <div className="book">
        <h4>{title}</h4>
        <h6>{subtitle}</h6>
        <h6>{author}</h6>
        {votes}
        <span onClick={e => this.upVote(e)} ref="btn" id={id}>
          <FaThumbsUp id={id} />
        </span>
        <span onClick={e => this.downVote(e)} ref="btn" id={id}>
          <FaThumbsDown id={id} />
        </span>
        {toggleInfo}

        <img
          className="book-image"
          src={image}
          onClick={e => this.openBook(e)}
          id={id}
        />
        <ul>{nuggetsDisplay}</ul>
        <Toggle>
          {({ on, toggle }) => (
            <div>
              {!on && <button onClick={toggle}>Comments</button>}
              {on && (
                <div>
                  <FaArrowCircleUp onClick={toggle} />

                  <Comments book={this.props.book} />
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
