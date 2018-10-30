import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";
import { fetchSharedBooks } from "./Shared-Books";

export const CHANGE_CURRENT_USER = "CHANGE_CURRENT_USER";
export const changeCurrentUser = data => ({
  type: CHANGE_CURRENT_USER,
  data
});

export const FETCH_PROTECTED_DATA_ERROR = "FETCH_PROTECTED_DATA_ERROR";
export const fetchProtectedDataError = error => ({
  type: FETCH_PROTECTED_DATA_ERROR,
  error
});

export const REQUEST_PROTECTED_DATA = "REQUEST_PROTECTED_DATA";
export const requestProtectedData = () => ({
  type: REQUEST_PROTECTED_DATA
});

export const fetchProtectedData = () => dispatch => {
  //getting user data

  const authToken = localStorage.getItem("authToken");
  //console.log('before dispatch request protected');
  dispatch(requestProtectedData());
  return fetch(`${API_BASE_URL}/api/users`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      console.log("res protected", res);
      return normalizeResponseErrors(res);
    })
    .then(res => {
      return res.json();
    })
    .then(userData => {
      console.log("user data", userData);
      //dispatch(fetchUserBooks());
      dispatch(fetchSharedBooks());
      dispatch(changeCurrentUser(userData));
    })
    .catch(err => {
      console.log("protected error from action", err);
      dispatch(fetchProtectedDataError(err));
    });
};

export const FETCH_USERBOOKS_SUCCESS = "FETCH_USERBOOKS_SUCCESS";
export const fetchUserBooksSuccess = userBooks => ({
  type: FETCH_USERBOOKS_SUCCESS,
  userBooks
});

export const fetchUserBooks = () => dispatch => {
  console.log("fetchUserBooks hit");
  const authToken = localStorage.getItem("authToken");
  dispatch(requestProtectedData(true));
  return fetch(`${API_BASE_URL}/api/userbooks`, {
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
    .then(userData => {
      console.log("user data in PD actions", userData);
      return dispatch(fetchUserBooksSuccess(userData));
    })
    .catch(err => {
      console.log("Error!", err);
      return dispatch(fetchProtectedDataError(err));
    });
};

// export const fetchBooks=()=>dispatch=>{
//     console.log('fetchBooks hit');
//         const authToken = localStorage.getItem('authToken');
//         dispatch(fetchSharedBooksRequest(true));
//         return fetch(`${API_BASE_URL}/api/userbooks`, {
//             method: 'GET',
//             headers: {
//                 // Provide our auth token as credentials
//                 Authorization: `Bearer ${authToken}`
//             }
//         })
//             .then(res => {
//                 console.log('response fetched PD', res);
//                return normalizeResponseErrors(res)})
//             .then(res => res.json())
//             .then((userData) => {
//                 console.log('user data in PD actions',userData);
//               return dispatch(fetchSharedBooksSuccess(userData))
//             })
//             .catch(err => {
//                 console.log('Error!', err);
//                 return dispatch(fetchSharedBooksError(err));
//             });

//     };
