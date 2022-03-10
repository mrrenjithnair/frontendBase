import { toast } from "react-toastify";

export const GET_CLUB_LIST = 'GET_CLUB_LIST';
export const GET_CLUB_LIST_SUCCESS = 'GET_CLUB_LIST_SUCCESS';
export const GET_CLUB_LIST_FAILURE = 'GET_CLUB_LIST_FAILURE';
export const INPUT_VALUE_CHANGED_CLUB = 'INPUT_VALUE_CHANGED_CLUB';
export const CLUB_ADD = 'CLUB_ADD';
export const CLUB_ADD_SUCCESS = 'CLUB_ADD_SUCCESS';
export const CLUB_ADD_FAILURE = 'CLUB_ADD_FAILURE';



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

export function onChangeValueClub(evt) {
    return {
      type: INPUT_VALUE_CHANGED_CLUB,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
      };
  }


  export function addClub() {
    return {
        type: CLUB_ADD,
    };
}
export function addClubSuccess(data) {
    toast.success("Club Added SuccessFully");
    return {
        type: CLUB_ADD_SUCCESS,
        data: data
    };
}
export function addClubFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: CLUB_ADD_FAILURE,
    };
}