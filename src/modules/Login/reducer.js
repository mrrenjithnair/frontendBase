import {
    LOGIN,
    INPUT_VALUE_CHANGED_LOGIN,
    ON_LOGIN_SUCCESS
} from './actions';

// The initial state of the Login Reducer
export const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: {},
    userName: {},
    password: {},
    count: 0,
    loginUser: null,
    sessiontoken: null
};

export default function (state = initialState, actions) {
    switch (actions.type) {

        case LOGIN:
            return { ...state, errors: {} };
        case ON_LOGIN_SUCCESS:
            let data = actions.data
            console.log('ON_LOGIN_SUCCESS', actions.data)
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            return { ...state, loginUser: data.user, sessiontoken: data.token };
        case INPUT_VALUE_CHANGED_LOGIN:
            console.log(actions.id, actions.value)
            return { ...state, [actions.id]: actions.value };
        default:
            return state;
    }
}