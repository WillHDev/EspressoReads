import React, { Component } from "react";
import TextArea from "./partials/Text-Area";

export default class NewBookForm extends Component {
  constructor() {
    super();
    this.state = {
      expandDescription: false
    };
  }

  expandDescription = () => {
    this.setState({
      expandDescription: !this.state.expandDescription
    });
  };
  render() {
    const { title, image, description, id } = this.props.newBook;

    if (this.props.newBook.title === "") {
      return "";
    }
    return (
      <div className="new-book-form" onSubmit={e => this.onSubmit(e)}>
        <a>
          {" "}
          <div
            className="book-image"
            style={{
              background: `url(${image === "" ? "./images/bird.jpg" : image} )`,
              backgroundSize: "cover"
            }}
          />
        </a>
        <label htmlFor="bookTitle">Title</label>
        <h6>{title}</h6>
        <button
          htmlFor="bookDescription"
          type="button"
          onClick={this.expandDescription}
        >
          Show Description
        </button>
        {this.state.expandDescription ? (
          <TextArea value={description} id={id} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
