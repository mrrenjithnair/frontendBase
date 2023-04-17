import {
    LOGIN,
    INPUT_VALUE_CHANGED_LOGIN,
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAILURE,
    ON_LOG_OUT
} from './actions';
import roleInfo from '../utils/roleInfo';
// The initial state of the Login Reducer
export const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: {},
    userName: '',
    password: '',
    count: 0,
    loginUser: null,
    sessionToken: null,
    loggedInUseId: null,
    socialLoginData: false,
    socialLogin: false
};

export default function (state = initialState, actions) {
    switch (actions.type) {
        case ON_LOG_OUT:
            return { state: initialState , errors: {} };
        case LOGIN:
            return { ...state, errors: {} };
        case ON_LOGIN_SUCCESS:
            let data = actions.data
            localStorage.setItem("isAuthenticated", "true");
            // localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            // localStorage.setItem("userPrivileges",JSON.stringify(data.user.privileges));
            localStorage.setItem("user", JSON.stringify(data.user));
            let privileges = JSON.stringify(data.user.privileges)
            privileges =privileges ? JSON.parse(privileges.replace(/\r?\n|\r|\t/g, '')): ''
            roleInfo.set(JSON.parse(privileges))
            return { ...state, loginUser: data.user, sessionToken: data.token, userPrivileges: privileges, loggedInUseId:data.user.id, loggedInRoleId:data.user.roleId, showProfile: data.user.showProfile  };
        case ON_LOGIN_FAILURE:
            return { ...state, loginUser: false, sessionToken: false, userPrivileges: false, loggedInUseId: false, loggedInRoleId:false, socialLogin: false, socialLogin: false
                ,socialLoginData: false
                ,socialLoginType: false};
        case INPUT_VALUE_CHANGED_LOGIN:
            console.log(actions.id, actions.value)
            return { ...state, [actions.id]: actions.value };
        default:
            return state;
    }
}