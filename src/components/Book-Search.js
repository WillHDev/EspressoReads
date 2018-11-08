import React, { Component, Fragment } from "react";
import { updateNewBookState, newBookErrorMessage } from "../actions/New-Book";
import $ from "jquery";
import ToggleButton from "./partials/Toggle-Button";
import ToggleInput from "./partials/Toggle-Input";
import Toggle from "./partials/Toggle";
import Modal from "./elements/Modal";

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

  updateNote(event) {
    console.log("hit updateNote", event.target.value);
    //this.setState({ Notes: event.target.value });
  }
  render() {
    let showBooks, showSearchInput, showToggleButton, descriptionButton;
    //const { showSearch } = this.props;
    if (this.state.booksToDisplay) {
      showBooks = this.state.booksToDisplay.map(item => {
        const { id } = item;

        const {
          title,
          authors,
          categories,
          description,
          infoLink,
          previewLink
        } = item.volumeInfo;
        let thumbnail;
        if (!item.volumeInfo.imageLinks) {
          thumbnail = "";
        } else {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <div
            key={id}
            className="book-card"
            onDoubleClick={() => {
              this.selectBook(id);
            }}
          >
            <div>{title}</div>
            <div>{authors}</div>
            <div>{categories}</div>

            <ToggleButton
              text={["Show Description", "Hide Description"]}
              onClick={id => this.expandDescription(id)}
            />
            {this.state.expandDescription.id ? <p>{description}</p> : ""}

            <a>
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
            </a>
          </div>
        );
      });
    }
    if (this.state.showSearchInput === false) {
      showToggleButton = (
        <button id="button" type="button" onClick={this.showSearchInput}>
          Search Books
        </button>
      );
    } else {
      showToggleButton = "";
      showSearchInput = (
        <form onSubmit={e => this.searchBooks(e)}>
          <input id="search" ref={input => (this.textInput = input)} />

          <button id="button" type="button" onClick={this.showSearchInput}>
            Search
          </button>
          <div id="grid book-search-grid">{showBooks}</div>
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
      <div className="new-book-search-container grid">
        <div className="parent">
          <h2>Find a Book</h2>

          <Fragment>
            {noResultsFound && (
              <Modal>
                <h1> Sorry we couldn't find your book</h1>
              </Modal>
            )}
          </Fragment>

          <ToggleInput
            text={["Add a Note", "Add"]}
            method={this.submitNote}
            onChange={e => this.updateNote(e)}
          />
          <div>
            {showToggleButton}
            {showSearchInput}
          </div>
        </div>
      </div>
    );
  }
}
