import { toast } from "react-toastify";

export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_FAILURE = 'GET_USER_LIST_FAILURE';
export const INPUT_VALUE_CHANGED_CLUB = 'INPUT_VALUE_CHANGED_CLUB';
export const USER_ADD = 'USER_ADD';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const USER_ADD_FAILURE = 'USER_ADD_FAILURE';



export function getUserList() {
    return {
        type: GET_USER_LIST,
    };
}
export function getUserListSuccess(data) {
    return {
        type: GET_USER_LIST_SUCCESS,
        data: data
    };
}
export function getUserListFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: GET_USER_LIST_FAILURE,
    };
}

export function onChangeValueClub(evt) {
    return {
      type: INPUT_VALUE_CHANGED_CLUB,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
      };
  }


  export function addUser() {
    return {
        type: USER_ADD,
    };
}
export function addUserSuccess(data) {
    toast.success("Club Added SuccessFully");
    return {
        type: USER_ADD_SUCCESS,
        data: data
    };
}
export function addUserFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: USER_ADD_FAILURE,
    };
}