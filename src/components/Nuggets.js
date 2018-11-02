import React from "react";

export class Nuggets extends React.Component {
  render() {
    return this.props.nuggets.map(nugget => {
      return (
        <li>
          <div>{nugget.description}</div>
          <div>{nugget.fromPage}</div>
          <div>{nugget.toPage}</div>
        </li>
      );
    });
  }
}
