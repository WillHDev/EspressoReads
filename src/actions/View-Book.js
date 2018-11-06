import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";
import { fetchUserBooks } from "./Protected-Data";

export const LOAD_BOOK_INTO_SINGLE_VIEW_REQUEST =
  "LOAD_BOOK_INTO_SINGLE_VIEW_REQUEST";
export const loadBookIntoSingleViewRequest = () => ({
  type: LOAD_BOOK_INTO_SINGLE_VIEW_REQUEST
});
export const LOAD_BOOK_INTO_SINGLE_VIEW_SUCCESS =
  "LOAD_BOOK_INTO_SINGLE_VIEW_SUCCESS";
export const loadBookIntoSingleViewSuccess = book => (
  console.log("book returned to success action", book),
  {
    type: LOAD_BOOK_INTO_SINGLE_VIEW_SUCCESS,
    book
  }
);
export const LOAD_BOOK_INTO_SINGLE_VIEW_ERROR =
  "LOAD_BOOK_INTO_SINGLE_VIEW_ERROR";
export const loadBookIntoSingleViewError = message => ({
  type: LOAD_BOOK_INTO_SINGLE_VIEW_ERROR,
  message
});

export const REMOVE_BOOK_FROM_SINGLE_VIEW = "REMOVE_BOOK_FROM_SINGLE_VIEW";
export const removeBookFromSingleView = () => ({
  type: REMOVE_BOOK_FROM_SINGLE_VIEW
});

export const loadBookIntoSingleView = bookId => dispatch => {
  const token = localStorage.getItem("authToken");
  // const bookId = this.props.match.params.id;
  console.log("id action", bookId);
  //console.log("API_BASE_URL", API_BASE_URL);
  fetch(`${API_BASE_URL}/api/books/${bookId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log("res", res);
      return res.json();
    })
    .then(book => {
      console.log(
        "book in action returned from server about to send success",
        book
      );
      dispatch(loadBookIntoSingleViewSuccess(book));
      //**** */
    })
    .catch(err => {
      return dispatch(loadBookIntoSingleViewError(err));
    });
};
