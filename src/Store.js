import { createStore, applyMiddleware, combineReducers } from "redux";
//import {reducer as formReducer} from 'redux-form';
import thunk from "redux-thunk";
import authReducer from "./reducers/Auth-Reducer";
import booksReducer from "./reducers/Books-Reducer";
//import booksReducer from './reducers/Books-Reducer';
import { reducer as formReducer } from "redux-form";
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// applyMiddleware(thunk)
import { composeWithDevTools } from "redux-devtools-extension";
import sharedBooksReducer from "./reducers/Shared-Books-Reducer";

//const reducer = authReducer;

const reducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  newBook: booksReducer,
  sharedBooks: sharedBooksReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// Hydrate the authToken from localStorage if it exist
// const authToken = localStorage.getItem('authToken');
// if (authToken) {
//     store.dispatch(refreshAuthToken());
// }

export default store;
