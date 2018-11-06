import {
  LOAD_BOOK_INTO_SINGLE_VIEW,
  LOAD_BOOK_INTO_SINGLE_VIEW_REQUEST,
  LOAD_BOOK_INTO_SINGLE_VIEW_SUCCESS,
  LOAD_BOOK_INTO_SINGLE_VIEW_ERROR
} from "../actions/View-Book";
export const initialState = {
  book: "",
  loading: "",
  error: null
};

export default function viewBookReducer(state = initialState, action) {
  if (action.type === LOAD_BOOK_INTO_SINGLE_VIEW_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === LOAD_BOOK_INTO_SINGLE_VIEW_SUCCESS) {
    return Object.assign({}, state, {
      book: action.book,
      loading: false
    });
  } else if (action.type === LOAD_BOOK_INTO_SINGLE_VIEW_ERROR) {
    return Object.assign({}, state, {
      error: action.message,
      loading: false
    });
  } else {
    return state;
  }
}
