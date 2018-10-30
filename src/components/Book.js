import React from "react";
import ToggleInfo from "./partials/Toggle-Info";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
//import {  } from "react-icons/fa";
import { changeVote } from "../actions/Votes";

export default class Book extends React.Component {
  upVote = event => {
    this.refs.btn.setAttribute("disabled", "disabled");
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
    console.log("ID from method", bookId, Object.keys(event.target));
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

    //console.log("PROPS.id", this.props.book.id);
    const { title, author, subtitle, id, image, votes } = this.props.book;
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

        <img className="book-image" src={image} />
        <ul>{nuggetsDisplay}</ul>
      </div>
    );
  }
}
