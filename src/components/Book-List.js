import React from "react";
import Book from "./Book";
import { loadBookIntoSingleView } from "../actions/View-Book";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class BookList extends React.Component {
  openBook = book => {
    // event.preventDefault();
    // const book = event.target;
    console.log("book", book);

    //this.props.dispatch(loadBookIntoSingleView(book));
    //this.props.history.push("/viewbook");
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
      console.log("this.props.sharedBooks", this.props.sharedBooks);
      const orderedBooks = this.props.sharedBooks.sort(function(a, b) {
        return a.votes - b.votes;
      });
      console.log("orderedBooks", orderedBooks);
      return (
        <div>
          {orderedBooks.map((book, i) => (
            <Book
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
