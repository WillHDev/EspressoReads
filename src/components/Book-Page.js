import React from "react";
import HeaderBar from "./Header-Bar";
import ToggleInfo from "./partials/Toggle-Info";
import { connect } from "react-redux";
import Book from "./Book";
import { removeBookFromSingleView } from "../actions/View-Book";

export class BookPage extends React.Component {
  constructor() {
    super();
    this.state = {
      voteDisable: null
    };
  }
  backToBooklist = () => {
    this.props.dispatch(removeBookFromSingleView());
    this.props.history.push("/dashboard");
  };

  render() {
    const { book } = this.props;
    console.log("book from book page", book);
    //let toggleInfo;
    // if (this.props.description !== "") {
    //   toggleInfo = <ToggleInfo info={this.props.description} />;
    // }
    //
    return (
      <div className="book-page">
        <a onClick={() => this.backToBooklist()}>Back</a>
        <HeaderBar />
        <Book book={book} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  book: state.viewBook
});

export default connect(mapStateToProps)(BookPage);
