import React from "react";
import "../styles/Nuggets.css";

export class Nuggets extends React.Component {
  render() {
    const nuggetsDisplay = this.props.nuggets.map(nugget => {
      return (
        <div className="nugget-card">
          <div className="nugget-description">{nugget.description}</div>
          <div className="nugget-pages">
            <div>
              <span>{nugget.fromPage} - </span>
              <span>{nugget.toPage}</span>
            </div>
          </div>
        </div>
      );
    });
    return <div className="grid">{nuggetsDisplay}</div>;
  }
}
