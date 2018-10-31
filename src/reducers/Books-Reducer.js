import {
  SHOW_NEW_BOOK_STATE,
  UPDATE_NEW_BOOK_STATE,
  NEW_BOOK_ERROR_MESSAGE,
  POST_NEW_BOOK_REQUEST,
  POST_NEW_BOOK_SUCCESS,
  RESET_NEW_BOOK_STATE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_ERROR,
  DELETE_BOOK_SUCCESS
} from "../actions/New-Book";

import {
  NEW_NUGGETS_ERROR_MESSAGE,
  POST_NEW_NUGGETS_REQUEST,
  POST_NEW_NUGGETS_SUCCESS
} from "../actions/Nuggets";
export const initialState = {
  errorMessage: "",
  title: "",
  subtitle: "",
  description: "",
  authors: "",
  Url: "",
  image: "",
  loading: false,
  nuggets: [],
  tags: [],
  podcasts: [
    {
      name: "",
      episode: "",
      segment: [
        {
          start: "",
          end: ""
        }
      ]
    }
  ]
};

//draft that's being edited
//currently uses 'update new BOOK state'
export default function newBookReducer(state = initialState, action) {
  // if (action.type === SHOW_NEW_BOOK_STATE) {
  //   return Object.assign({}, state, {
  //     showNewBOOK: action.bool
  //   });

  // }
  if (action.type === POST_NEW_BOOK_REQUEST) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === UPDATE_NEW_BOOK_STATE) {
    return Object.assign({}, state, action.updateObject);
  } else if (action.type === POST_NEW_BOOK_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === POST_NEW_NUGGETS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === POST_NEW_NUGGETS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === RESET_NEW_BOOK_STATE) {
    return Object.assign({}, state, initialState);
  } else if (action.type === NEW_BOOK_ERROR_MESSAGE) {
    return Object.assign({}, state, {
      errorMessage: action.message,
      loading: false
    });
  } else if (action.type === DELETE_BOOK_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === DELETE_BOOK_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      errorMessage: action.error
    });
  } else if (action.type === DELETE_BOOK_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      errorMessage: null
    });
  } else {
    return state;
  }
}
