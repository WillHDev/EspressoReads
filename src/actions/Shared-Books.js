import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";

export const fetchSharedBooks = () => dispatch => {
  console.log("fetchBooks hit");
  const authToken = localStorage.getItem("authToken");
  dispatch(fetchSharedBooksRequest(true));
  return fetch(`${API_BASE_URL}/api/books`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      console.log("response fetched PD", res);
      return normalizeResponseErrors(res);
    })
    .then(res => res.json())
    .then(bookData => {
      console.log("user data in PD actions", bookData);
      return dispatch(fetchSharedBooksSuccess(bookData));
    })
    .catch(err => {
      console.log("Error!", err);
      return dispatch(fetchSharedBooksError(err));
    });
};

export const FETCH_SHARED_BOOKS_SUCCESS = "FETCH_SHARED_BOOKS_SUCCESS";
export const fetchSharedBooksSuccess = books => ({
  type: FETCH_SHARED_BOOKS_SUCCESS,
  books
});

export const FETCH_SHARED_BOOKS_ERROR = "FETCH_SHARED_BOOKS_ERROR";
export const fetchSharedBooksError = error => ({
  type: FETCH_SHARED_BOOKS_ERROR,
  error
});

export const FETCH_SHARED_BOOKS_REQUEST = "FETCH_SHARED_BOOKS_REQUEST";
export const fetchSharedBooksRequest = () => ({
  type: FETCH_SHARED_BOOKS_REQUEST
});
