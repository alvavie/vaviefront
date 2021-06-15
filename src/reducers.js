import { combineReducers } from 'redux';
import {
    REQUEST_CLIENT,
    RECEIVE_CLIENT,
    RECEIVE_CLIENT_ERROR,
    REQUEST_CONTRACTS,
    RECEIVE_CONTRACTS,
    RECEIVE_CONTRACTS_ERROR,

    REQUEST_SIGNUP,
    RECEIVE_SIGNUP,
    RECEIVE_SIGNUP_ERROR,
    REQUEST_SIGNIN,
    RECEIVE_SIGNIN,
    RECEIVE_SIGNIN_ERROR,
} from './constants/ActionsTypes';

export function currentClient(
    state = {
        isFetching: false,
        client: [],
    },
    action
) {
    switch (action.type) {
        case REQUEST_CLIENT:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_CLIENT:
            return Object.assign({}, state, {
                isFetching: false,
                client: action.client,
            });
        case RECEIVE_CLIENT_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                client: action.error,
            });
        default:
            return state;
    }
}


export function currentContracts(
    state = {
        isFetching: false,
        contracts: [],
    },
    action
) {
    switch (action.type) {
        case REQUEST_CONTRACTS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_CONTRACTS:
            return Object.assign({}, state, {
                isFetching: false,
                contracts: action.contracts,
            });
        case RECEIVE_CONTRACTS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                contracts: action.error,
            });
        default:
            return state;
    }
}

export function currentSignup(
    state = {
        isFetching: false,
        response: {},
    },
    action
) {
    switch (action.type) {
        case REQUEST_SIGNUP:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_SIGNUP:
            return Object.assign({}, state, {
                isFetching: false,
                response: action.response,
            });
        case RECEIVE_SIGNUP_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                response: action.error,
            });
        default:
            return state;
    }
}

export function currentSignin(
    state = {
        isFetching: false,
        response: {},
    },
    action
) {
    switch (action.type) {
        case REQUEST_SIGNIN:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_SIGNIN:
            return Object.assign({}, state, {
                isFetching: false,
                response: action.response,
            });
        case RECEIVE_SIGNIN_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                response: action.error,
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    currentClient,
    currentContracts,
    currentSignup,
    currentSignin,
});

export default rootReducer;