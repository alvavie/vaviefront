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
    BASE_URL,
    AUTH_URI,
} from './constants/ActionsTypes';

let headers = new Headers();


export function requestClient(username) {
    const token = localStorage.token;
    return {
        type: REQUEST_CLIENT,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-access-token': `${token}`
        },
        method: 'POST',
        body: JSON.stringify({username: username}),
    };
}

function receiveClient(json) {
    return {
        type: RECEIVE_CLIENT,
        client: json,
    };
}

function receiveClientErr(error) {
    return {
        type: RECEIVE_CLIENT_ERROR,
        error,
    };
}


export function requestContracts(clientId) {
    const token = localStorage.token;
    return {
        type: REQUEST_CONTRACTS,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-access-token': `${token}`
        },
        method: 'POST',
        body: JSON.stringify({clientId: clientId}),
    };
}

function receiveContracts(json) {
    return {
        type: RECEIVE_CONTRACTS,
        contracts: json,
    };
}

function receiveContractsErr(error) {
    return {
        type: RECEIVE_CONTRACTS_ERROR,
        error,
    };
}


export function fetchClientData(username) {
    return dispatch => {
        dispatch(requestClient(username));
        return fetch(BASE_URL + '/getClientInfo', requestClient(username))
            .then(res => res.json())
            .then(json => dispatch(receiveClient(json)))
            .catch(err => dispatch(receiveClientErr(err)));
    };
}

export function fetchContractsData(clientId) {
    return dispatch => {
        dispatch(requestContracts(clientId));
        return fetch(BASE_URL + '/getContracts', requestContracts(clientId))
            .then(res => res.json())
            .then(json => dispatch(receiveContracts(json)))
            .catch(err => dispatch(receiveContractsErr(err)));
    };
}


// AUTH

export function requestSignup(username, email, password) {
    return {
        type: REQUEST_SIGNUP,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({username: username, email: email, password: password}),
    };
}

function receiveSignup(json) {
    return {
        type: RECEIVE_SIGNUP,
        response: json,
    };
}

function receiveSignupErr(error) {
    return {
        type: RECEIVE_SIGNUP_ERROR,
        error,
    };
}

export function fetchSignupData(username, email, password) {
    return dispatch => {
        dispatch(requestSignup(username, email, password));
        return fetch(BASE_URL + AUTH_URI + '/signup', requestSignup(username, email, password))
            .then(res => res.json())
            .then(json => dispatch(receiveSignup(json)))
            .catch(err => dispatch(receiveSignupErr(err)));
    };
}

export function requestSignin(username, password) {
    return {
        type: REQUEST_SIGNIN,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
    };
}

function receiveSignin(json) {
    return {
        type: RECEIVE_SIGNIN,
        response: json,
    };
}

function receiveSigninErr(error) {
    return {
        type: RECEIVE_SIGNIN_ERROR,
        error,
    };
}

export function fetchSigninData(username, password) {
    return dispatch => {
        dispatch(requestSignin(username, password));
        return fetch(BASE_URL + AUTH_URI + '/signin', requestSignin(username, password))
            .then(res => res.json())
            //.then(json => dispatch(receiveSignin(json)))
            .then(json => {
                localStorage.setItem("token", json.accessToken);
                localStorage.setItem("user", username);
                dispatch(receiveSignin(json));
            })
            .catch(err => dispatch(receiveSigninErr(err)));
    };
}


