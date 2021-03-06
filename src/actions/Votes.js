import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";
import { fetchSharedBooks } from "./Shared-Books";
export const changeVote = (bookId, voteAction) => dispatch => {
  const authToken = localStorage.getItem("authToken");
  dispatch(changeVoteRequest(true));
  return fetch(`${API_BASE_URL}/api/books/${bookId}`, {
    method: "PUT",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(voteAction)
  })
    .then(res => {
      return normalizeResponseErrors(res);
    })
    .then(res => res.json())
    .then(bookData => {
      return dispatch(changeVoteSuccess(bookData));
    })
    .then(() => {
      dispatch(fetchSharedBooks());
    })
    .catch(err => {
      return dispatch(changeVoteError(err));
    });
};

export const CHANGE_VOTE_SUCCESS = "CHANGE_VOTE_SUCCESS";
export const changeVoteSuccess = books => ({
  type: CHANGE_VOTE_SUCCESS,
  books
});

export const CHANGE_VOTE_ERROR = "CHANGE_VOTE_ERROR";
export const changeVoteError = error => ({
  type: CHANGE_VOTE_ERROR,
  error
});

export const CHANGE_VOTE_REQUEST = "CHANGE_VOTE_REQUEST";
export const changeVoteRequest = () => ({
  type: CHANGE_VOTE_REQUEST
});
