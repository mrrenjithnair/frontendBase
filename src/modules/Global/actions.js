import { toast } from "react-toastify";

export const SET_DATA_FROM_LOCAL = 'SET_DATA_FROM_LOCAL';
export const INPUT_VALUE_CHANGED_GLOBAL = 'INPUT_VALUE_CHANGED_GLOBAL';
export const GET_CLUB_DETAIL = 'GET_CLUB_DETAIL';
export const GET_CLUB_DETAIL_SUCCESS = 'GET_CLUB_DETAIL_SUCCESS';
export const GET_CLUB_DETAIL_FAILED = 'GET_CLUB_DETAIL_FAILED';
export const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';
export const GET_CLUB_ADMINS = 'GET_CLUB_ADMINS';
export const GLOBAL_SUCCESS = 'GLOBAL_SUCCESS';
export const GLOBAL_FAILED = 'GLOBAL_FAILED';
export const RESET_DASHBOARD = 'RESET_DASHBOARD';
export const GET_TOURNAMENT_LIST_GLOBAL = 'GET_TOURNAMENT_LIST_GLOBAL';
export const GET_TOURNAMENT_LIST_GLOBAL_SUCCESS = 'GET_TOURNAMENT_LIST_GLOBAL_SUCCESS';
export const GET_TOURNAMENT_LIST_GLOBAL_FAILURE = 'GET_TOURNAMENT_LIST_GLOBAL_FAILURE';
export const GET_TOURNAMENT_DETAIL_GLOBAL_SUCCESS = 'GET_TOURNAMENT_DETAIL_GLOBAL_SUCCESS';


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
  toast.error(err);
  return {
    type: GET_CLUB_DETAIL_FAILED
    };
}
  

export function getClubAdmins() {
  return {
    type: GET_CLUB_ADMINS,
    };
}


export function globalSuccess(data) {
  return {
    type: GLOBAL_SUCCESS,
    payload: data,
  };
}
export function globalFailed(err) {
  console.log('err', err)
  toast.error(err);
  return {
    type: GLOBAL_FAILED
  };
}


export function resetDashboard(err) {
  return {
      type: RESET_DASHBOARD,
  };
}



export function getTournamentList() {
  return {
      type: GET_TOURNAMENT_LIST_GLOBAL,
  };
}

export function getTournamentListSuccess(data) {
  return {
      type: GET_TOURNAMENT_LIST_GLOBAL_SUCCESS,
      data: data
  };
}

export function getTournamentDetail(data) {
  return {
      type: GET_TOURNAMENT_DETAIL_GLOBAL_SUCCESS,
      data: data
  };
}


export function getTournamentListFailure(err) {
  toast.error(err);
  return {
      type: GET_TOURNAMENT_LIST_GLOBAL_FAILURE,
  };
}