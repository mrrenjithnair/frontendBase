import { toast } from "react-toastify";

export const GET_TOURNAMENT_DETAIL = 'GET_TOURNAMENT_DETAIL';
export const GET_TOURNAMENT_DETAIL_SUCCESS = 'GET_TOURNAMENT_DETAIL_SUCCESS';
export const GET_TOURNAMENT_DETAIL_FAILURE = 'GET_TOURNAMENT_DETAIL_FAILURE';
export const INPUT_VALUE_CHANGED_CLUB = 'INPUT_VALUE_CHANGED_CLUB';
export const INPUT_VALUE_CHANGED_EDIT_CLUB = 'INPUT_VALUE_CHANGED_EDIT_CLUB';

export const TOURNAMENT_ADD = 'TOURNAMENT_ADD';
export const TOURNAMENT_ADD_SUCCESS = 'TOURNAMENT_ADD_SUCCESS';
export const TOURNAMENT_ADD_FAILURE = 'TOURNAMENT_ADD_FAILURE';

export const JOIN_TOURNAMENT = 'JOIN_TOURNAMENT';
export const JOIN_TOURNAMENT_SUCCESS = 'JOIN_TOURNAMENT_SUCCESS';
export const JOIN_TOURNAMENT_FAILURE = 'JOIN_TOURNAMENT_FAILURE';
export const INPUT_VALUE_CHANGED_EDIT_TEAM = 'INPUT_VALUE_CHANGED_EDIT_TEAM';
export const INPUT_VALUE_CHANGED_TEAM = 'INPUT_VALUE_CHANGED_TEAM';



export function getTournamentDetails() {
    return {
        type: GET_TOURNAMENT_DETAIL,
    };
}
export function getTournamentDetailsSuccess(data) {
    return {
        type: GET_TOURNAMENT_DETAIL_SUCCESS,
        data: data
    };
}
export function getTournamentDetailsFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: GET_TOURNAMENT_DETAIL_FAILURE,
    };
}

export function onChangeValueTeam(evt) {
    return {
      type: INPUT_VALUE_CHANGED_TEAM,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value
      };
  }


  export function onChangeValueEditTeam(evt) {
    return {
      type: INPUT_VALUE_CHANGED_EDIT_TEAM,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value
      };
  }
