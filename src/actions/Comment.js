import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";
import { fetchSharedBooks } from "./Shared-Books";

export const addComment = commentData => dispatch => {
  console.log("commentData", commentData);

  const bookId = commentData.book.id;
  console.log("bookId", bookId);

  const authToken = localStorage.getItem("authToken");
  dispatch(addCommentRequest(true));
  ///${bookId}
  return fetch(`${API_BASE_URL}/api/comments`, {
    method: "POST",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commentData)
  })
    .then(res => {
      return normalizeResponseErrors(res);
    })
    .then(res => res.json())
    .then(createdComment => {
      console.log("createdComment", createdComment);
      return dispatch(addCommentToBook(createdComment, bookId));
    })

    .catch(err => {
      console.log("Error!", err);
      return dispatch(addCommentError(err));
    });
};

export const addCommentToBook = (createdComment, bookId) => dispatch => {
  const authToken = localStorage.getItem("authToken");
  dispatch(addCommentToBookRequest(true));
  return fetch(`${API_BASE_URL}/api/books/${bookId}`, {
    method: "PUT",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createdComment)
  })
    .then(res => {
      return normalizeResponseErrors(res);
    })
    .then(res => res.json())
    .then(() => {
      //updatedBookData
      return dispatch(addCommentToBookSuccess());
    })
    .then(() => {
      dispatch(fetchSharedBooks());
    })
    .catch(err => {
      console.log("Error!", err);
      return dispatch(addCommentError(err));
    });
};
//createdComment
export const ADD_COMMENT_TO_BOOK_SUCCESS = "ADD_COMMENT_TO_BOOK_SUCCESS";
export const addCommentToBookSuccess = createdComment => ({
  type: ADD_COMMENT_TO_BOOK_SUCCESS
});

export const ADD_COMMENT_TO_BOOK_ERROR = "ADD_COMMENT_TO_BOOK_ERROR";
export const addCommentToBookError = error => ({
  type: ADD_COMMENT_TO_BOOK_ERROR,
  error
});

export const ADD_COMMENT_TO_BOOK_REQUEST = "ADD_COMMENT_TO_BOOK_REQUEST";
export const addCommentToBookRequest = () => ({
  type: ADD_COMMENT_TO_BOOK_REQUEST
});

//  commentData
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const addCommentSuccess = commentData => ({
  type: ADD_COMMENT_SUCCESS
});

export const ADD_COMMENT_ERROR = "ADD_COMMENT_ERROR";
export const addCommentError = error => ({
  type: ADD_COMMENT_ERROR,
  error
});

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const addCommentRequest = () => ({
  type: ADD_COMMENT_REQUEST
});
