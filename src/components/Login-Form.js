import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import Input from "./partials/Input";
import { login } from "../actions/Auth";
import { required, nonEmpty } from "./partials/Validators";
const uuidv4 = require("uuid/v4");

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.randomId = uuidv4();
    this.usernameId = uuidv4();
    this.passwordId = uuidv4();
  }

  onSubmit(values) {
    return this.props.dispatch(
      login(values[this.usernameId], values[this.passwordId])
    );
  }

  demoLogin = () => {
    document.getElementById(this.usernameId).value = "gatsby";
    document.getElementById(this.passwordId).value = "password12";
    this.props.dispatch(login("gatsby", "password12"));
  };

  render() {
    let error;
    if (this.props.error) {
      error = (
        <p className="form-error" aria-live="polite">
          {this.props.error}
        </p>
      );
    }

    //const {handleSubmit} = this.props;
    return (
      <form
        id={this.randomId}
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {error}

        <label htmlFor={this.randomId}>Username</label>
        <Field
          className="round"
          component={Input}
          autofocus
          type="text"
          name={this.usernameId}
          id={this.usernameId}
          validate={[required, nonEmpty]}
        />

        <label htmlFor={this.randomId}>Password</label>
        <Field
          className="round"
          component={Input}
          type="password"
          name={this.passwordId}
          id={this.passwordId}
          validate={[required, nonEmpty]}
        />

        <div className="align-right">
          <button
            className="round"
            disabled={this.props.pristine || this.props.submitting}
          >
            Log in
          </button>
          <br />
          <br />
        </div>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: "login"
})(LoginForm);
export default LoginForm;
