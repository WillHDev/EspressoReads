import {createStore, applyMiddleware, combineReducers} from 'redux';
//import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import authReducer from './reducers/Auth-Reducer';
//import booksReducer from './reducers/Books-Reducer';
import {reducer as formReducer} from 'redux-form';
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// applyMiddleware(thunk)



//const reducer = authReducer;

const store = createStore(
    combineReducers({
        form: formReducer,
    auth: authReducer

  }),
applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
// const authToken = localStorage.getItem('authToken');
// if (authToken) {
//     store.dispatch(refreshAuthToken());
// }

export default store;