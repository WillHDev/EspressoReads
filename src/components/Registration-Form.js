import React from "react";
import { Field, reduxForm } from "redux-form";
import { registerUser } from "../actions/Users";
import Input from "./partials/Input";
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed
} from "./partials/Validators";
import { authError } from "../actions/Auth";
const passwordLength = length({ min: 10, max: 72 });
const uuidv4 = require("uuid/v4");

export class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.randomId = uuidv4();
    this.usernameId = uuidv4();
    this.passwordId = uuidv4();
    this.emailAddressId = uuidv4();
    this.matchesPassword = matches(this.passwordId);
  }
  onSubmit(values) {
    values.preventDefault();
    const username = values.target[this.usernameId].value;
    console.log("username", username);
    const password = values.target[this.passwordId].value;
    const email = values.target[this.emailAddressId].value;
    console.log("email", email);
    const email2 = values.target[0].value;
    console.log("email2", email2);
    if (!username) {
      return this.props.dispatch(authError("Username is required."));
    } else if (!password) {
      return this.props.dispatch(authError("Password is required."));
    } else if (!email) {
      return this.props.dispatch(authError("Email is required."));
    }

    const user = { username, password, email };
    this.props.dispatch(authError(null));
    return this.props.dispatch(registerUser(user));
  }

  componentWillUnmount() {
    this.props.dispatch(authError(null));
  }

  render() {
    //<p className='form-error'>{this.props.errorMessage}</p>
    console.log("error message reg", this.props.errorMessage);
    console.log("username etc", this.emailAddressId, this.username);
    return (
      <form
        id={this.randomId}
        className="registration-form"
        onSubmit={values => this.onSubmit(values)}
      >
        <label htmlFor={this.emailAddressId}>Email</label>
        <Field
          component={Input}
          autofocus
          type="email"
          name={this.emailAddressId}
          validate={[required, nonEmpty, isTrimmed]}
        />

        <label htmlFor={this.usernameId}>Username</label>
        <Field
          component={Input}
          autofocus
          type="text"
          name={this.usernameId}
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor={this.passwordId}>Password</label>
        <Field
          component={Input}
          type="password"
          name={this.passwordId}
          validate={[required, passwordLength, isTrimmed]}
        />

        <label htmlFor="passwordConfirm">Confirm password</label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, this.matchesPassword]}
        />

        <div className="align-right">
          <button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "registration"
})(RegistrationForm);
