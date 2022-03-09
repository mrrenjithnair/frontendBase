import { toast } from "react-toastify";

export const GET_CLUB_LIST = 'GET_CLUB_LIST';
export const GET_CLUB_LIST_SUCCESS = 'GET_CLUB_LIST_SUCCESS';
export const GET_CLUB_LIST_FAILURE = 'GET_CLUB_LIST_FAILURE';
export const INPUT_VALUE_CHANGED_LOGIN = 'INPUT_VALUE_CHANGED_LOGIN';



export function getClubList() {
    return {
        type: GET_CLUB_LIST,
    };
}
export function getClubListSuccess(data) {
    return {
        type: GET_CLUB_LIST_SUCCESS,
        data: data
    };
}
export function getClubListFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: GET_CLUB_LIST_FAILURE,
    };
}

export function onChangeValueLogin(evt) {
    return {
      type: INPUT_VALUE_CHANGED_LOGIN,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
      };
  }