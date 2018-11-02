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
    //this.props.dispatch(loadBookIntoSingleView(this.))
    // this.setState({ view: this.props.book });
    const token = localStorage.getItem("authToken");
    const bookId = this.props.match.params.id;
    console.log("id", bookId);
    console.log("API_BASE_URL", API_BASE_URL);
    fetch(`${API_BASE_URL}/api/books/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log("res", res);
        return res.json();
      })
      .then(book => {
        console.log("book", book);

        return this.setState({ book });
      });
  };
  backToBooklist = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    //const { book } = this.props;
    const book = this.state.book;
    console.log("book state from book page", book);
    //let toggleInfo;
    // if (this.props.description !== "") {
    //   toggleInfo = <ToggleInfo info={this.props.description} />;
    // }
    //
    if (!this.state.book) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div className="book-page">
          <a onClick={() => this.backToBooklist()}>Back</a>
          <HeaderBar />
          <Book book={book} />
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  book: state.viewBook
});

export default connect(mapStateToProps)(BookPage);
