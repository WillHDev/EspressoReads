import React, { Component } from "react";

/* eslint react/prop-types: 0 default-case: 0 */
/* eslint consistent-return: 0  */
// TODO: add prop-types for children if needed
// TODO: add default case

export default class icon extends Component {
  static defaultProps = {
    color: "black",
    height: "24px",
    width: "24px"
  };

  render() {
    // eslint-disable-next-line
    const { name, color, width, height } = this.props;
    switch (name) {
      case "close":
        return (
          <svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        );
    }
  }
}
