import React, { Component } from "react";
import TextArea from "./partials/Text-Area";
import "../styles/BookForm.css";

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
        <label htmlFor="bookTitle">Title</label>
        <h6 className="bookform-title">{title}</h6>
        <a
          htmlFor="bookDescription"
          type="button"
          onClick={this.expandDescription}
        >
          Show Description
        </a>
        {this.state.expandDescription ? (
          <TextArea value={description} id={id} />
        ) : (
          ""
        )}
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
      </div>
    );
  }
}
