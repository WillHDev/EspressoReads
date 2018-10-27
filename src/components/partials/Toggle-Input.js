import React from "react";

export default class ToggleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInitialText: true,
      goBack: false,
      value: ""
    };
  }
  switchButtons = () => {
    this.setState({
      displayInitialText: false
    });
  };

  cancel = () => {
    this.setState({
      displayInitialText: true
    });
  };

  firePropsMethod = () => {
    return this.props.method();
  };
  render() {
    let buttonText, cancelButton, input, button;
    const { text } = this.props;
    if (this.state.displayInitialText) {
      return (
        <div className="toggle-input">
          <button
            htmlFor={this.props.text}
            type="button"
            onClick={this.switchButtons}
          >
            {text[0]}
          </button>
        </div>
      );
    } else if (this.props.text.length > 1) {
      return (
        <div className="toggle-input">
          <button
            htmlFor={this.props.text}
            type="button"
            onClick={this.firePropsMethod}
          >
            {text[1]}
          </button>
          <input
            //value={this.state.value}
            onChange={this.props.onChange}
            type="text"
            id={this.props.id}
            name={this.props.name}
            value={this.props.value}
          />
          <button onClick={this.cancel}>X</button>
        </div>
      );
    } else {
      return (
        <div className="toggle-input">
          <input
            //value={this.state.value}
            onChange={this.props.onChange}
            type="text"
            id={this.props.id}
            name={this.props.name}
            value={this.props.value}
          />
          <button onClick={this.cancel}>X</button>
        </div>
      );
    }
  }
}
