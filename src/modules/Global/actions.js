import { toast } from "react-toastify";

export const SET_DATA_FROM_LOCAL = 'SET_DATA_FROM_LOCAL';
export const INPUT_VALUE_CHANGED_GLOBAL = 'INPUT_VALUE_CHANGED_GLOBAL';
export const GET_CLUB_DETAIL = 'GET_CLUB_DETAIL';
export const GET_CLUB_DETAIL_SUCCESS = 'GET_CLUB_DETAIL_SUCCESS';
export const GET_CLUB_DETAIL_FAILED = 'GET_CLUB_DETAIL_FAILED';
export const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';


export function setDataFromLocal() {
  return {
    type: SET_DATA_FROM_LOCAL,
    };
}

export function onChangeValueGlobal(evt) {
    return {
      type: INPUT_VALUE_CHANGED_GLOBAL,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
      };
}
export function getClubDetail() {
  return {
    type: GET_CLUB_DETAIL,
    };
}
export function getClubDetailSuccess(data) {
  return {
    type: GET_CLUB_DETAIL_SUCCESS,
    payload: data,
    };
}
export function getClubDetailFailed(err) {
  console.log('err',err)
  toast.error(err);
  return {
    type: GET_CLUB_DETAIL_FAILED
    };
}
  