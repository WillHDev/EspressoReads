import React from "react";
import HeaderBar from "./Header-Bar";

import { connect } from "react-redux";
import Book from "./Book";
import { loadBookIntoSingleView } from "../actions/View-Book";

export class BookPage extends React.Component {
  constructor() {
    super();
    this.state = {
      voteDisable: null,
      view: {},
      book: null
    };
  }

  componentWillMount = () => {
    const bookId = this.props.match.params.id;

    this.props.dispatch(loadBookIntoSingleView(bookId));
  };

  render() {
    const book = this.props.viewBook.book;

    if ((this.props.viewBook.id = "")) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div className="book-page">
          <HeaderBar />
          <div className="single-book">
            <Book singleView={book} book={book} />
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  viewBook: state.viewBook
});

export default connect(mapStateToProps)(BookPage);
