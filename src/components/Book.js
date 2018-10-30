import React from "react";
import ToggleInfo from "./partials/Toggle-Info";

export default class Book extends React.Component {
  render() {
    let nuggetsDisplay;
    if (this.props.book.nuggets) {
      nuggetsDisplay = this.props.book.nuggets.map(nugget => {
        return (
          <li>
            <div>{nugget.description}</div>
            <div>{nugget.fromPage}</div>
            <div>{nugget.toPage}</div>
          </li>
        );
      });
    }
    let toggleInfo;
    if (this.props.description !== "") {
      toggleInfo = <ToggleInfo info={this.props.description} />;
    }
    return (
      <div className="book">
        <h4>{this.props.book.title}</h4>
        <h6>{this.props.book.subtitle}</h6>
        <h6>{this.props.book.author}</h6>
        {toggleInfo}

        <img className="book-image" src={this.props.book.image} />
        <ul>{nuggetsDisplay}</ul>
      </div>
    );
  }
}
