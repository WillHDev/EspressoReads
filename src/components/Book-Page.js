import React from "react";
import HeaderBar from "./Header-Bar";
import ToggleInfo from "./partials/Toggle-Info";
import { connect } from "react-redux";
import Book from "./Book";
import {
  removeBookFromSingleView,
  loadBookIntoSingleView
} from "../actions/View-Book";
import { API_BASE_URL } from "../config";

export class BookPage extends React.Component {
  constructor() {
    super();
    this.state = {
      voteDisable: null,
      view: {},
      book: null
    };
  }
  // componentWillUnmount = () => {
  //   this.props.dispatch(removeBookFromSingleView());
  // };
  componentWillMount = () => {
    const bookId = this.props.match.params.id;

    this.props.dispatch(loadBookIntoSingleView(bookId));
  };
  backToBooklist = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    //const { book } = this.props;
    const book = this.props.viewBook.book;

    //let toggleInfo;
    // if (this.props.description !== "") {
    //   toggleInfo = <ToggleInfo info={this.props.description} />;
    // }
    //
    if ((this.props.viewBook.id = "")) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div className="book-page">
          <a onClick={() => this.backToBooklist()}>Back</a>
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
