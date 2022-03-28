import { toast } from "react-toastify";

export const GET_TOURNAMENT_LIST = 'GET_TOURNAMENT_LIST';
export const GET_TOURNAMENT_LIST_SUCCESS = 'GET_TOURNAMENT_LIST_SUCCESS';
export const GET_TOURNAMENT_LIST_FAILURE = 'GET_TOURNAMENT_LIST_FAILURE';
export const INPUT_VALUE_CHANGED_CLUB = 'INPUT_VALUE_CHANGED_CLUB';
export const TOURNAMENT_ADD = 'TOURNAMENT_ADD';
export const TOURNAMENT_ADD_SUCCESS = 'TOURNAMENT_ADD_SUCCESS';
export const TOURNAMENT_ADD_FAILURE = 'TOURNAMENT_ADD_FAILURE';

export const JOIN_TOURNAMENT = 'JOIN_TOURNAMENT';
export const JOIN_TOURNAMENT_SUCCESS = 'JOIN_TOURNAMENT_SUCCESS';
export const JOIN_TOURNAMENT_FAILURE = 'JOIN_TOURNAMENT_FAILURE';



export function getTournamentList() {
    return {
        type: GET_TOURNAMENT_LIST,
    };
}
export function getTournamentListSuccess(data) {
    return {
        type: GET_TOURNAMENT_LIST_SUCCESS,
        data: data
    };
}
export function getTournamentListFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: GET_TOURNAMENT_LIST_FAILURE,
    };
}

export function onChangeValueClub(evt) {
    return {
      type: INPUT_VALUE_CHANGED_CLUB,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
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

export function joinClub() {
    return {
        type: JOIN_TOURNAMENT,
    };
}
export function joinClubSuccess(data) {
    toast.success("Requested for joining club successFully");
    return {
        type: JOIN_TOURNAMENT_SUCCESS,
        data: data
    };
}
export function joinClubFailure(err) {
    console.log('err', err)
    toast.error(err);
    return {
        type: JOIN_TOURNAMENT_FAILURE,
    };
}
