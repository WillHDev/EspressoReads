import { LOAD_BOOK_INTO_SINGLE_VIEW } from "../actions/View-Book";
export const initialState = {
  id: "",
  errorMessage: "",
  title: "",
  subtitle: "",
  description: "",
  authors: "",
  Url: "",
  image: "",
  loading: false,
  nuggets: [],
  tags: []
};

export default function viewBookReducer(state = initialState, action) {
  if (action.type === LOAD_BOOK_INTO_SINGLE_VIEW) {
    return Object.assign({}, state, action.bookData);
  } else {
    return state;
  }
}
