import { AUTH_REQUEST, AUTH_ERROR } from '../actions/Auth';
import { FETCH_PROTECTED_DATA_ERROR, REQUEST_PROTECTED_DATA, 
    CHANGE_CURRENT_USER, FETCH_USERBOOKS_SUCCESS} from '../actions/Protected-Data';

const initialState = {
    currentUser: null,
    userBooks:null,
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });

    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.errorMessage
        });
    } else if (action.type === FETCH_USERBOOKS_SUCCESS) {
        console.log('action.userBooks', action.userBooks);
        return Object.assign({}, state, {
            loading: false,
            userBooks: action.userBooks
        });

    } else if (action.type === REQUEST_PROTECTED_DATA) {
        return Object.assign({}, state, {
            loading: true
        });

    } else if (action.type === CHANGE_CURRENT_USER) {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            currentUser: action.data
        })

    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        })
    }

    return state;
}