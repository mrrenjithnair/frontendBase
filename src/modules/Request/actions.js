import { toast } from "react-toastify";

export const GET_CLUB_REQUEST = 'GET_CLUB_REQUEST';
export const GET_CLUB_REQUEST_SUCCESS = 'GET_CLUB_REQUEST_SUCCESS';
export const GET_CLUB_REQUEST_FAILURE = 'GET_CLUB_REQUEST_FAILURE';
export const INPUT_VALUE_CHANGED_CLUB = 'INPUT_VALUE_CHANGED_CLUB';
export const INPUT_VALUE_CHANGED_EDIT_CLUB = 'INPUT_VALUE_CHANGED_EDIT_CLUB';

export const TOURNAMENT_ADD = 'TOURNAMENT_ADD';
export const TOURNAMENT_ADD_SUCCESS = 'TOURNAMENT_ADD_SUCCESS';
export const TOURNAMENT_ADD_FAILURE = 'TOURNAMENT_ADD_FAILURE';

export const REQUEST_ACTION = 'REQUEST_ACTION';
export const REQUEST_ACTION_SUCCESS = 'REQUEST_ACTION_SUCCESS';
export const REQUEST_ACTION_FAILURE = 'REQUEST_ACTION_FAILURE';



export function getClubRequest() {
    return {
        type: GET_CLUB_REQUEST,
    };
}
export function getClubRequestSuccess(data) {
    return {
        type: GET_CLUB_REQUEST_SUCCESS,
        data: data
    };
}
export function getClubRequestFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: GET_CLUB_REQUEST_FAILURE,
    };
}

export function onChangeValueClub(evt) {
    return {
      type: INPUT_VALUE_CHANGED_CLUB,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
      };
  }

  export function onChangeValueEditClub(evt) {
    return {
      type: INPUT_VALUE_CHANGED_EDIT_CLUB,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value
      };
  }

export function addTournament() {
    return {
        type: TOURNAMENT_ADD,
    };
}
export function addTournamentSuccess(data) {
    toast.success("Club Added SuccessFully");
    return {
        type: TOURNAMENT_ADD_SUCCESS,
        data: data
    };
}
export function addTournamentFailure(err) {
    console.log('err', err)
    toast.error(err);
    return {
        type: TOURNAMENT_ADD_FAILURE,
    };
}

export function editTournament() {
    return {
        type: 'TOURNAMENT_EDIT',
    };
}
export function editTournamentSuccess(data) {
    toast.success("Club submited SuccessFully");
    return {
        type: 'TOURNAMENT_EDIT_SUCCESS',
        data: data
    };
}
export function editTournamentFailure(err) {
    console.log('err', err)
    toast.error(err);
    return {
        type: 'TOURNAMENT_EDIT_FAILURE',
    };
}
export function requestAction(type, tournamentId, clubId,requestId, status) {
    console.log(type, tournamentId, clubId, requestId, status)
    return {
        type: REQUEST_ACTION,
        requestType:type,
        tournamentId: tournamentId,
        clubId: clubId,
        status:status,
        requestId:requestId

    };
}
export function requestActionSuccess(data) {
    toast.success("Status Updated successFully");
    return {
        type: REQUEST_ACTION_SUCCESS,
        data: data
    };
}
export function requestActionFailure(err) {
    console.log('err', err)
    toast.error(err);
    return {
        type: REQUEST_ACTION_FAILURE,
    };
}
