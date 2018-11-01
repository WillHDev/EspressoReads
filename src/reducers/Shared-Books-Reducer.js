import {
  FETCH_SHARED_BOOKS_ERROR,
  FETCH_SHARED_BOOKS_SUCCESS,
  FETCH_SHARED_BOOKS_REQUEST
} from "../actions/Shared-Books";
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  ADD_COMMENT_TO_BOOK_REQUEST,
  ADD_COMMENT_TO_BOOK_SUCCESS,
  ADD_COMMENT_TO_BOOK_ERROR
} from "../actions/Comment";

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
  } else if (action.type === ADD_COMMENT_REQUEST) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === ADD_COMMENT_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === ADD_COMMENT_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === ADD_COMMENT_TO_BOOK_REQUEST) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === ADD_COMMENT_TO_BOOK_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === ADD_COMMENT_TO_BOOK_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}
