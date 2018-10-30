import { AUTH_REQUEST, AUTH_ERROR } from "../actions/Auth";
import {
  FETCH_SHARED_BOOKS_ERROR,
  FETCH_SHARED_BOOKS_SUCCESS,
  FETCH_SHARED_BOOKS_REQUEST
} from "../actions/Shared-Books";

const initialState = {
  sharedBooks: [],
  loading: false,
  error: null
};

export default function sharedBooksReducer(state = initialState, action) {
  if (action.type === FETCH_SHARED_BOOKS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_SHARED_BOOKS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      sharedBooks: action.books
    });
  } else if (action.type === FETCH_SHARED_BOOKS_ERROR) {
    console.log("action.userBooks", action.userBooks);
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}
