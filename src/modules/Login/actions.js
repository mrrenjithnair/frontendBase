import { toast } from "react-toastify";

export const LOGIN = 'LOGIN';
export const ON_LOGIN_FAILURE = 'ON_LOGIN_FAILURE';
export const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';
export const INPUT_VALUE_CHANGED_LOGIN = 'INPUT_VALUE_CHANGED_LOGIN';



export function login() {
    return {
        type: LOGIN,
    };
}
export function onLoginSuccess(data) {
    toast.success("Login Success");
    return {
        type: ON_LOGIN_SUCCESS,
        data: data
    };
}
export function onLoginFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: ON_LOGIN_FAILURE,
    };
}

export function onChangeValueLogin(evt) {
    return {
      type: INPUT_VALUE_CHANGED_LOGIN,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
      };
  }