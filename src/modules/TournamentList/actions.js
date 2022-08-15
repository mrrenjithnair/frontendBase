import { toast } from "react-toastify";

export const GET_TOURNAMENT_LIST = 'GET_TOURNAMENT_LIST';
export const GET_TOURNAMENT_LIST_SUCCESS = 'GET_TOURNAMENT_LIST_SUCCESS';
export const GET_TOURNAMENT_LIST_FAILURE = 'GET_TOURNAMENT_LIST_FAILURE';
export const INPUT_VALUE_CHANGED_CLUB = 'INPUT_VALUE_CHANGED_CLUB';
export const INPUT_VALUE_CHANGED_EDIT_CLUB = 'INPUT_VALUE_CHANGED_EDIT_CLUB';

export const TOURNAMENT_ADD = 'TOURNAMENT_ADD';
export const TOURNAMENT_ADD_SUCCESS = 'TOURNAMENT_ADD_SUCCESS';
export const TOURNAMENT_ADD_FAILURE = 'TOURNAMENT_ADD_FAILURE';

export const JOIN_TOURNAMENT = 'JOIN_TOURNAMENT';
export const JOIN_TOURNAMENT_SUCCESS = 'JOIN_TOURNAMENT_SUCCESS';
export const JOIN_TOURNAMENT_FAILURE = 'JOIN_TOURNAMENT_FAILURE';

export const GET_MY_TOURNAMENT_LIST = 'GET_MY_TOURNAMENT_LIST';



export function getMyTournamentList() {
    return {
        type: GET_MY_TOURNAMENT_LIST,
    };
}

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
export function requestJoin(type, tournamentId, clubId) {
    return {
        type: JOIN_TOURNAMENT,
        requestType:type,
        tournamentId: tournamentId,
        clubId: clubId

    };
}
export function requestJoinSuccess(data) {
    toast.success("Requested for joining tournament successFully");
    return {
        type: JOIN_TOURNAMENT_SUCCESS,
        data: data
    };
}
export function requestJoinFailure(err) {
    console.log('err', err)
    toast.error(err);
    return {
        type: JOIN_TOURNAMENT_FAILURE,
    };
}
