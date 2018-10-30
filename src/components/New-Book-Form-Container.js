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
      nuggetCount: 0
    };
  }
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

    const nuggetsObject = {};
    nuggetsObject.nuggets = this.state.nuggets;
    this.props.dispatch(postNewBook(newEntry, nuggetsObject));
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
    this.props.dispatch(
      postNewBook({
        ...this.props.newBook,
        nuggets: this.state.nuggets
      })
    );
  };

  addNugget = () => {
    const newNuggetCount = this.state.nuggetCount + 1;
    const newNuggetId = "nugget" + newNuggetCount;
    const newNuggetObject = {};
    newNuggetObject.name = newNuggetId;

    this.setState({
      nuggetCount: newNuggetCount,
      nuggets: [...this.state.nuggets, newNuggetObject]
    });
  };
  render() {
    let nuggetInputsDisplay, actionButtons;
    if (this.props.newBook.title === "") {
      actionButtons = "";
    } else {
      actionButtons = (
        <div className="action-buttons">
          <button type="button" onClick={this.addNugget}>
            Add Nugget
          </button>
          <button
            type="submit"
            id="submit-new-entry"
            onClick={this.submitNewEntry}
          >
            Submit
          </button>
        </div>
      );
    }

    if (this.state.nuggetCount > 0) {
      nuggetInputsDisplay = this.state.nuggets.map((nugget, i) => {
        const nuggetId = `nugget` + `${[i + 1]}`;
        return (
          <div key={nuggetId}>
            <label htmlFor="nuggetInput">{nuggetId}:</label>
            <br />

            <input
              placeholder="page"
              value={this.state.nuggets[i].fromPage}
              onChange={e => this.updateFromPageState(e)}
              type="text"
              id={nuggetId}
              title="from"
              name={[i]}
            />
            <span>to</span>
            <input
              placeholder="page"
              value={this.state.nuggets[i].toPage}
              onChange={e => this.updateToPageState(e)}
              type="text"
              id={nuggetId}
              name={[i]}
            />
            <ToggleInput
              text={["Add Description"]}
              method={this.fireAction}
              onChange={e => this.updateDescriptionState(e)}
              value={this.state.nuggets[i].description}
              name={[i]}
              id={nuggetId}
            />
          </div>
        );
      });
    }
    return (
      <div className="new-book-form-container">
        {nuggetInputsDisplay}

        {actionButtons}
        <NewBookForm onSubmit={e => this.handleSubmit(e)} {...this.props} />
        <NewBookSearch dispatch={this.props.dispatch} />
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
