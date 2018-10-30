import { AUTH_REQUEST, AUTH_ERROR } from "../actions/Auth";
import {
  CHANGE_VOTE_ERROR,
  CHANGE_VOTE_REQUEST,
  CHANGE_VOTE_SUCCESS
} from "../actions/Votes";

const initialState = {
  sharedBooks: [],
  loading: false,
  error: null
};

export default function sharedBooksReducer(state = initialState, action) {
  if (action.type === CHANGE_VOTE_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === CHANGE_VOTE_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      sharedBooks: action.books
    });
  } else if (action.type === CHANGE_VOTE_ERROR) {
    console.log("action.userBooks", action.userBooks);
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}
