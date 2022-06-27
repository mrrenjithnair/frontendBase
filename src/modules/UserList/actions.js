import { toast } from "react-toastify";

export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_FAILURE = 'GET_USER_LIST_FAILURE';
export const INPUT_VALUE_CHANGED_USER = 'INPUT_VALUE_CHANGED_USER';

export const ON_CHANGE_USER_UPDATE = 'ON_CHANGE_USER_UPDATE';

export const USER_ADD = 'USER_ADD';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const USER_ADD_FAILURE = 'USER_ADD_FAILURE';

export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';




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

export function onChangeValueUser(evt) {
    return {
      type: INPUT_VALUE_CHANGED_USER,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
      };
  }
  export function onChangeUserUpdate(id ,key, value) {
      return {
        type: ON_CHANGE_USER_UPDATE,
        id ,key, value
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


export function userUpdate(id) {
    return {
        type: USER_UPDATE,
        id
    };
}
export function userUpdateSuccess(data) {
    toast.success("user updated SuccessFully");
    return {
        type: USER_UPDATE_SUCCESS,
        data: data
    };
}
export function userUpdateFailure(err) {
    toast.error(err);
    return {
        type: USER_UPDATE_FAILURE,
    };
}
