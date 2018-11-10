import React, { Component } from "react";
import NewBookForm from "./New-Book-Form";
import NewBookSearch from "./Book-Search";
import { postNewBook } from "../actions/New-Book";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ToggleInput from "./partials/Toggle-Input";

export class NewBookFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      nuggets: [],
      nuggetCount: 0,
      showSearch: true
    };
  }

  addNugget = e => {
    this.setState(prevState => ({
      nuggets: [
        ...prevState.nuggets,
        { fromPage: "", toPage: "", description: "" }
      ]
    }));
  };

  handleChange = e => {
    const nuggetUpdate = e.target.value;
    const key = e.target.className;
    const index = e.target.name;

    const targetState = this.state.nuggets;
    targetState[index][key] = nuggetUpdate;

    this.setState({
      nuggets: targetState
    });
  };

  submitNewEntry = () => {
    const newEntry = {
      userId: this.props.currentUser.id,
      title: this.props.newBook.title,
      subtitle: this.props.newBook.subtitle,
      description: this.props.newBook.description,
      authors: this.props.newBook.authors,
      id: this.props.newBook.id,
      Url: this.props.newBook.Url,
      image: this.props.newBook.image
    };

    // const nuggetsObject = {};
    // nuggetsObject.nuggets = this.state.nuggets;
    // this.props.dispatch(postNewBook(newEntry, nuggetsObject));
  };
  updateFromPageState(event) {
    const nuggetId = event.target.id;
    const inputValue = event.target.value;
    const index = event.target.name;
    let updateNugget = {};
    const nuggets = [...this.state.nuggets];
    nuggets[index].fromPage = inputValue;
    this.setState({
      nuggets
    });
  }
  updateToPageState(event) {
    const nuggetId = event.target.id;
    const inputValue = event.target.value;
    const index = event.target.name;
    let updateNugget = {};
    const nuggets = [...this.state.nuggets];
    nuggets[index].toPage = inputValue;
    this.setState({
      nuggets
    });
  }

  updateDescriptionState(event) {
    const nuggetId = event.target.id;
    const inputValue = event.target.value;
    const index = event.target.name;
    let updateNugget = {};
    const nuggets = [...this.state.nuggets];
    nuggets[index].description = inputValue;
    this.setState({
      nuggets
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const bookData = {
      userId: this.props.currentUser.id,
      title: this.props.newBook.title,
      subtitle: this.props.newBook.subtitle,
      description: this.props.newBook.description,
      authors: this.props.newBook.authors,
      id: this.props.newBook.id,
      Url: this.props.newBook.Url,
      image: this.props.newBook.image
    };
    const nuggetsObject = {};
    nuggetsObject.nuggets = this.state.nuggets;
    this.props.dispatch(postNewBook(bookData, nuggetsObject));
  };

  toggleSearch = () => {
    this.setState({
      showSearch: !this.state.showSearch
    });
  };

  render() {
    let nuggetInputsDisplay, actionButtons, searchDisplay;

    if (this.state.showSearch) {
      searchDisplay = (
        <NewBookSearch
          dispatch={this.props.dispatch}
          showSearch={this.toggleSearch}
        />
      );
    } else {
      searchDisplay = (
        <h6 className="back-to-search-button" onClick={this.toggleSearch}>
          Back to Search
        </h6>
      );
    }

    if (this.props.newBook.title === "") {
      actionButtons = "";
    } else {
      actionButtons = (
        <div className="action-buttons">
          <a type="button" onClick={this.addNugget}>
            Add Nugget
          </a>
          <br />
          <br />
          <input className="nugget-submit" type="submit" value="Submit" />
        </div>
      );
    }

    if (this.state.nuggets !== null) {
      const { nuggets } = this.state;

      nuggetInputsDisplay = nuggets.map((nugget, i) => {
        const nuggetId = `nugget` + `${[i + 1]}`;
        return (
          <div key={nuggetId}>
            <label htmlFor="nuggetInput">{nuggetId}:</label>
            <br />

            <input
              placeholder="page"
              value={nuggets[i].fromPage}
              //onChange={e => this.updateFromPageState(e)}
              type="number"
              id={nuggetId}
              title="from"
              name={i}
              className="fromPage"
            />
            <span>to</span>
            <input
              placeholder="page"
              value={nuggets[i].toPage}
              type="number"
              id={nuggetId}
              name={i}
              className="toPage"
            />
            <ToggleInput
              text={["Add Description"]}
              method={this.fireAction}
              onChange={e => this.updateDescriptionState(e)}
              value={nuggets[i].description}
              name={i}
              id={nuggetId}
              className="description"
            />
          </div>
        );
      });
    }
    return (
      <div className="new-book-form-container">
        <NewBookForm onSubmit={e => this.handleSubmit(e)} {...this.props} />
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          {nuggetInputsDisplay}

          {actionButtons}
        </form>
        {searchDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newBook: state.newBook,
  currentUser: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(NewBookFormContainer));

// nuggetCount = this.state.nuggetCount + 1;

// nuggets = this.state.nuggets

// nuggets['nugget'+nuggetCount] = '';

// this.setState({nuggetCount:nuggetCount, nuggets:nuggets});

//<label htmlFor="bookTitle">Title</label>
//<h6>{this.props.newBook.title}</h6>
