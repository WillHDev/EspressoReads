import React, { Component, Fragment } from "react";
import { updateNewBookState } from "../actions/New-Book";
import $ from "jquery";

import Toggle from "./partials/Toggle";
import Modal from "./elements/Modal";
import "../styles/BookForm.css";

export default class NewBookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null,
      booksToDisplay: [],
      showSearchInput: false,
      expandDescription: {}
    };
  }

  searchBooks(event) {
    event.preventDefault();
    const text = this.textInput.value.trim();
    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=" + text,
      dataType: "json",
      success: function(data) {
        this.upDateStateWithFetchedBooks(data.items);
      }.bind(this),
      type: "GET"
    });
    this.setState({
      searchTerm: text
    });

    this.textInput.value = "";
  }
  upDateStateWithFetchedBooks = items => {
    this.setState({ booksToDisplay: items });
  };
  selectBook(id) {
    const selectedBook = this.state.booksToDisplay.find(book => {
      return book.id === id;
    });

    const {
      title,
      authors,
      categories,
      description,
      infoLink
    } = selectedBook.volumeInfo;
    const { thumbnail } = selectedBook.volumeInfo.imageLinks;

    this.props.dispatch(
      updateNewBookState({
        errorMessage: "",
        id: id,
        title: title,
        authors: authors,
        image: thumbnail,
        description: description,
        Url: infoLink,
        tags: categories
      })
    );
    this.setState(({ booksToDisplay }) => {
      return {
        booksToDisplay: null,
        searchTerm: null
      };
    });
    this.props.showSearch();
  }
  showSearchInput = () => {
    this.setState(({ showSearchInput }) => {
      return { showSearchInput: !showSearchInput };
    });
  };
  expandDescription = id => {
    if (!this.state.expandDescription.id) {
      return this.setState({
        expandDescription: { ...this.state.expandDescription, id: true }
      });
    }
    return this.setState({
      expandDescription: {
        ...this.state.expandDescription,
        id: !this.state.expandDescription.id
      }
    });
  };

  addNewBookDescriptionToggle(id) {
    this.setState({
      expandDescription: {
        ...this.state.expandDescription,
        id: false
      }
    });
    this.expandDescription[id] = false;
  }

  render() {
    let showBooks, showSearchInput, showToggleButton, authorInfo;

    if (this.state.booksToDisplay) {
      showBooks = this.state.booksToDisplay.map(item => {
        const { id } = item;

        const { title, authors, description } = item.volumeInfo;
        let thumbnail;
        if (!item.volumeInfo.imageLinks) {
          thumbnail = "";
        } else {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }
        if (authors) {
          authorInfo = <div className="book-search-author">by {authors}</div>;
        }
        let abbrevTitle;
        abbrevTitle = title;
        if (title.length > 60) {
          abbrevTitle = (
            <div>
              {" "}
              <span> {abbrevTitle.slice(0, 60)} </span>{" "}
              <span className="small-dots">...</span>{" "}
            </div>
          );
        }
        return (
          <div
            key={id}
            className="book-card-search"
            onDoubleClick={() => {
              this.selectBook(id);
            }}
          >
            <div className="book-search-title">{abbrevTitle}</div>
            {authorInfo}
            <div>
              {" "}
              <div
                className="book-image"
                style={{
                  background: `url(${
                    thumbnail === "" ? "./images/bird.jpg" : thumbnail
                  } )`,
                  backgroundSize: "cover"
                }}
              />
            </div>

            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  <button onClick={toggle}>Description</button>
                  {on && <div>{description}</div>}
                </Fragment>
              )}
            </Toggle>
          </div>
        );
      });
    }
    if (this.state.showSearchInput === false) {
      showToggleButton = (
        <button
          id="button"
          className="round search-button"
          type="button"
          onClick={this.showSearchInput}
        >
          Search Books
        </button>
      );
    } else {
      showToggleButton = "";
      showSearchInput = (
        <form onSubmit={e => this.searchBooks(e)}>
          <input
            id="search"
            ref={input => (this.textInput = input)}
            className="round"
          />

          <button id="button" type="submit" className="cursor round">
            Search
          </button>
          <div id=" book-search-grid">{showBooks}</div>
        </form>
      );
    }
    let noResultsFound, showModal;
    if (!this.state.booksToDisplay && this.state.searchTerm !== null) {
      noResultsFound = true;
    } else {
      noResultsFound = false;
    }

    return (
      <div className="new-book-search-container ">
        <div className="parent">
          <h2>Find a Book</h2>

          <Fragment>
            {noResultsFound && (
              <Modal>
                <h1> Sorry we couldn't find your book</h1>
              </Modal>
            )}
          </Fragment>

          <div>
            {showToggleButton}
            {showSearchInput}
          </div>
        </div>
      </div>
    );
  }
}
