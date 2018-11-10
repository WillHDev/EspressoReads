import React from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

class ToggleInfoButton extends React.Component {
  state = {
    showInfo: false
  };
  toggleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo
    });
  };
  render() {
    if (this.state.showInfo === false) {
      return (
        <div>
          <div onClick={this.toggleInfo}>
            {" "}
            <p>Description </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div onClick={this.toggleInfo}>
            {" "}
            <p>Hide Description</p>
          </div>
          <div>
            <p>{this.props.info}</p>
          </div>
        </div>
      );
    }
  }
}

export default ToggleInfoButton;
