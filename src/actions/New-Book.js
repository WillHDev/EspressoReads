import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './Utils';
import {fetchUserBooks} from './Protected-Data';

export const SHOW_NEW_BOOK_STATE = 'SHOW_NEW_BOOK_STATE';
export const showNewBookState = bool => ({
  type: SHOW_NEW_BOOK_STATE,
  bool
});


export const UPDATE_NEW_BOOK_STATE = 'UPDATE_NEW_BOOK_STATE';
export const updateNewBookState = updateObject => ({
  type: UPDATE_NEW_BOOK_STATE,
  updateObject
});


export const RESET_NEW_BOOK_STATE = 'RESET_NEW_BOOK_STATE';
export const resetNewBookState = () => ({
  type: RESET_NEW_BOOK_STATE
});

export const NEW_BOOK_ERROR_MESSAGE = 'NEW_BOOK_ERROR_MESSAGE';
export const newBookErrorMessage = message => ({
  type: NEW_BOOK_ERROR_MESSAGE,
  message
});

export const POST_NEW_BOOK_REQUEST = 'POST_NEW_BOOK_REQUEST';
export const postNewBookRequest = () => ({
  type: POST_NEW_BOOK_REQUEST,
  
});
export const POST_NEW_BOOK_SUCCESS = 'POST_NEW_BOOK_SUCCESS';
export const postNewBookSuccess = () => ({
  type: POST_NEW_BOOK_SUCCESS,
  
});

export const postNewBook = bookData => dispatch => {
  dispatch(postNewBookRequest());
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/api/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(bookData)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      return dispatch(updateNewBookState({id: res.id}));
    
    })
    .then(() => { 
      dispatch(postNewBookSuccess());
      return Promise.resolve();
    })
    .catch(err => Promise.reject(err) );
};

export const DELETE_BOOK_REQUEST = 'DELETE_BOOK_REQUEST';
export const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST
});

export const DELETE_BOOK_ERROR = 'DELETE_BOOK_ERROR';
export const deleteBookError = (error) => ({
  type: DELETE_BOOK_ERROR,
  error
});

export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
export const deleteBookSuccess = () => ({
  type: DELETE_BOOK_SUCCESS
});


export const deleteBook = (bookId) => dispatch => {
  dispatch(deleteBookRequest());
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/api/BOOKs/${bookId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(()=>dispatch(fetchUserBooks()))
    // .then(res => res.json())
    .then(() => dispatch(deleteBookSuccess()))
    .catch(err => Promise.reject(err));
};
