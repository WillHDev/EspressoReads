import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/Auth-Reducer";
import booksReducer from "./reducers/Books-Reducer";
import { reducer as formReducer } from "redux-form";
import { composeWithDevTools } from "redux-devtools-extension";
import sharedBooksReducer from "./reducers/Shared-Books-Reducer";
//import votesReducer from "./reducers/exp";
import viewBookReducer from "./reducers/View-Book-Reducer";

const reducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  newBook: booksReducer,
  sharedBooks: sharedBooksReducer,
  viewBook: viewBookReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// Hydrate the authToken from localStorage if it exist
// const authToken = localStorage.getItem('authToken');
// if (authToken) {
//     store.dispatch(refreshAuthToken());
// }

export default store;
