import React from "react";
import BookAll from "./Book-All";
import { fetchSharedBooks } from "../actions/Shared-Books";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../styles/Booklist.css";

export class BookList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSharedBooks());
  }
  openBook = book => {
    this.props.history.push(`/book/${book.id}`);
  };
  render() {
    if (this.props.loading) {
      return <p>Loading...</p>;
    }

    if (this.props.sharedBooks.length < 1) {
      return (
        <div>
          <p>
            <strong>No Books Found! Why don't you create one?</strong>
          </p>
        </div>
      );
    } else {
      //order by vote count
      //console.log("this.props.sharedBooks", this.props.sharedBooks);
      const orderedBooks = this.props.sharedBooks.sort(function(a, b) {
        return a.votes - b.votes;
      });

      return (
        <div className="grid">
          {orderedBooks.map((book, i) => (
            <BookAll
              key={i}
              id={book}
              book={book}
              dispatch={this.props.dispatch}
              onClick={() => this.openBook(book)}
            />
          ))}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(BookList));
