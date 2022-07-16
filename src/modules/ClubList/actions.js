import { toast } from "react-toastify";

export const GET_CLUB_LIST = 'GET_CLUB_LIST';
export const GET_CLUB_LIST_SUCCESS = 'GET_CLUB_LIST_SUCCESS';
export const GET_CLUB_LIST_FAILURE = 'GET_CLUB_LIST_FAILURE';
export const INPUT_VALUE_CHANGED_CLUB = 'INPUT_VALUE_CHANGED_CLUB';
export const CLUB_ADD = 'CLUB_ADD';
export const CLUB_ADD_SUCCESS = 'CLUB_ADD_SUCCESS';
export const CLUB_ADD_FAILURE = 'CLUB_ADD_FAILURE';

export const JOIN_CLUB = 'JOIN_CLUB';
export const JOIN_CLUB_SUCCESS = 'JOIN_CLUB_SUCCESS';
export const JOIN_CLUB_FAILURE = 'JOIN_CLUB_FAILURE';



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
    toast.error(err);
    return {
        type: CLUB_ADD_FAILURE,
    };
}

export function joinClub() {
    return {
        type: JOIN_CLUB,
    };
}
export function joinClubSuccess(data) {
    toast.success("Requested for joining club successFully");
    return {
        type: JOIN_CLUB_SUCCESS,
        data: data
    };
}
export function joinClubFailure(err) {
    toast.error(err);
    return {
        type: JOIN_CLUB_FAILURE,
    };
}
