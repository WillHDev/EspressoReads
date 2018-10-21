import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './Utils';
import { fetchProtectedData } from './Protected-Data';


export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});


export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = errorMessage => ({
  type: AUTH_ERROR,
  errorMessage
});


export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return (
    fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
  // Reject any requests which don't return a 200 status, creating
  // errors which follow a consistent format
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(({authToken}) => {
        localStorage.setItem('authToken', authToken);
        //   dispatch(fetchUserEvents());
        dispatch(fetchProtectedData());  // <-------- Logs in, gets auth token, then immediately fetches the user data
      })
      .catch(err => {
        const {code} = err;
        const message =
                    code === 401
                      ? 'Incorrect username or password'
                      : 'Unable to login, please try again';
        dispatch(authError(message));
        // Could not authenticate, so return a SubmissionError for Redux
        // Form
        return Promise.reject(
          new SubmissionError({
            _error: message
          })
        );
      })
  );
};
