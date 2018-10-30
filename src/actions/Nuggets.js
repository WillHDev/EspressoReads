import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";
import { fetchUserNUGGETSs } from "./Protected-Data";

// export const SHOW_NEW_NUGGETS_STATE = 'SHOW_NEW_NUGGETS_STATE';
// export const showNewNUGGETSState = bool => ({
//   type: SHOW_NEW_NUGGETS_STATE,
//   bool
// });

// export const UPDATE_NEW_NUGGETS_STATE = 'UPDATE_NEW_NUGGETS_STATE';
// export const updateNewNUGGETSState = updateObject => ({
//   type: UPDATE_NEW_NUGGETS_STATE,
//   updateObject
// });

// export const RESET_NEW_NUGGETS_STATE = 'RESET_NEW_NUGGETS_STATE';
// export const resetNewNUGGETSState = () => ({
//   type: RESET_NEW_NUGGETS_STATE
// });

export const NEW_NUGGETS_ERROR_MESSAGE = "NEW_NUGGETS_ERROR_MESSAGE";
export const newNuggetsErrorMessage = message => ({
  type: NEW_NUGGETS_ERROR_MESSAGE,
  message
});

export const POST_NEW_NUGGETS_REQUEST = "POST_NEW_NUGGETS_REQUEST";
export const postNewNuggetsRequest = () => ({
  type: POST_NEW_NUGGETS_REQUEST
});
export const POST_NEW_NUGGETS_SUCCESS = "POST_NEW_NUGGETS_SUCCESS";
export const postNewNuggetsSuccess = () => ({
  type: POST_NEW_NUGGETS_SUCCESS
});

export const postNewNuggets = NuggetsData => dispatch => {
  console.log("dispatch", dispatch);
  dispatch(postNewNuggetsRequest());

  const token = localStorage.getItem("authToken");
  return fetch(`${API_BASE_URL}/api/nuggets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(NuggetsData)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(nuggetIds => {
      dispatch(postNewNuggetsSuccess());
      //return Promise.resolve();
      console.log("nug ids from async return", nuggetIds);
      return nuggetIds;
    })
    .catch(err => Promise.reject(err));
};

// export const DELETE_NUGGETS_REQUEST = 'DELETE_NUGGETS_REQUEST';
// export const deleteNUGGETSRequest = () => ({
//   type: DELETE_NUGGETS_REQUEST
// });

// export const DELETE_NUGGETS_ERROR = 'DELETE_NUGGETS_ERROR';
// export const deleteNUGGETSError = (error) => ({
//   type: DELETE_NUGGETS_ERROR,
//   error
// });

// export const DELETE_NUGGETS_SUCCESS = 'DELETE_NUGGETS_SUCCESS';
// export const deleteNUGGETSSuccess = () => ({
//   type: DELETE_NUGGETS_SUCCESS
// });

// export const deleteNUGGETS = (NUGGETSId) => dispatch => {
//   dispatch(deleteNUGGETSRequest());
//   const token = localStorage.getItem('authToken');
//   return fetch(`${API_BASE_URL}/api/NUGGETSs/${NUGGETSId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   })
//     .then(res => normalizeResponseErrors(res))
//     .then(()=>dispatch(fetchUserNUGGETSs()))
//     // .then(res => res.json())
//     .then(() => dispatch(deleteNUGGETSSuccess()))
//     .catch(err => Promise.reject(err));
// };
