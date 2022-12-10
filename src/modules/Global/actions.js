import { toast } from "react-toastify";

export const ON_LOG_OUT = 'ON_LOG_OUT';
export const SET_OVERLAY_LOADING = 'SET_OVERLAY_LOADING';

export const SET_DATA_FROM_LOCAL = 'SET_DATA_FROM_LOCAL';
export const INPUT_VALUE_CHANGED_GLOBAL = 'INPUT_VALUE_CHANGED_GLOBAL';
export const GET_CLUB_DETAIL = 'GET_CLUB_DETAIL';
export const GET_CLUB_DETAIL_SUCCESS = 'GET_CLUB_DETAIL_SUCCESS';
export const GET_CLUB_DETAIL_FAILED = 'GET_CLUB_DETAIL_FAILED';
export const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';
export const ON_LOGIN_FAILURE = 'ON_LOGIN_FAILURE';

export const GET_CLUB_ADMINS = 'GET_CLUB_ADMINS';
export const GLOBAL_SUCCESS = 'GLOBAL_SUCCESS';
export const GLOBAL_FAILED = 'GLOBAL_FAILED';
export const RESET_DASHBOARD = 'RESET_DASHBOARD';
export const GET_TOURNAMENT_LIST_GLOBAL = 'GET_TOURNAMENT_LIST_GLOBAL';
export const GET_TOURNAMENT_LIST_GLOBAL_SUCCESS = 'GET_TOURNAMENT_LIST_GLOBAL_SUCCESS';
export const GET_PENDING_TOURNAMENT_LIST_GLOBAL_SUCCESS = 'GET_PENDING_TOURNAMENT_LIST_GLOBAL_SUCCESS';

export const GET_TOURNAMENT_LIST_GLOBAL_FAILURE = 'GET_TOURNAMENT_LIST_GLOBAL_FAILURE';
export const GET_TOURNAMENT_DETAIL_GLOBAL_SUCCESS = 'GET_TOURNAMENT_DETAIL_GLOBAL_SUCCESS';
export const GET_AUCTION_PLAYER = 'GET_AUCTION_PLAYER';
export const GET_AUCTION_PLAYER_SUCCESS = 'GET_AUCTION_PLAYER_SUCCESS';
export const GET_AUCTION_PLAYER_FAILURE = 'GET_AUCTION_PLAYER_FAILURE';

export const ADD_PLAYER_TO_TEAM = 'ADD_PLAYER_TO_TEAM';
export const ADD_PLAYER_TO_TEAM_SUCCESS = 'ADD_PLAYER_TO_TEAM_SUCCESS';
export const ADD_PLAYER_TO_TEAM_FAILURE = 'ADD_PLAYER_TO_TEAM_FAILURE';
export const RESET_TOAST = 'RESET_TOAST';
export const SET_TOAST = 'SET_TOAST';

export const GET_USER_LIST_GLOBAL_FAILURE = 'GET_USER_LIST_GLOBAL_FAILURE';
export const GET_USER_LIST_GLOBAL = 'GET_USER_LIST_GLOBAL';
export const GET_USER_LIST_GLOBAL_SUCCESS = 'GET_USER_LIST_GLOBAL_SUCCESS';

export const GET_USER_DETAIL = 'GET_USER_DETAIL';
export const GET_USER_DETAILL_SUCCESS = 'GET_USER_DETAILL_SUCCESS';
export const GET_USER_DETAIL_FAILURE = 'GET_USER_DETAIL_FAILURE';
export const ON_CHANGE_VALUE_PROFILE = 'ON_CHANGE_VALUE_PROFILE';
export const PROFILE_EDIT = 'PROFILE_EDIT';
export const PROFILE_EDIT_SUCCESS = 'PROFILE_EDIT_SUCCESS';
export const PROFILE_EDIT_FAILURE = 'PROFILE_EDIT_FAILURE';

export const GET_PLAYER_TEAM_LIST_FAILURE = 'GET_PLAYER_TEAM_LIST_FAILURE';
export const GET_PLAYER_TEAM_LIST_SUCCESS = 'GET_PLAYER_TEAM_LIST_SUCCESS';
export const GET_PLAYER_TEAM_LIST = 'GET_PLAYER_TEAM_LIST';

export const CREATE_AUCTION = 'CREATE_AUCTION';
export const CREATE_AUCTION_SUCCESS = 'CREATE_AUCTION_SUCCESS';
export const CREATE_AUCTION_FAILURE = 'CREATE_AUCTION_FAILURE';

export const UPLOAD_PHOTO = 'UPLOAD_PHOTO';
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE';

export const TEAM = 'TEAM';
export const TEAM_SUCCESS = 'TEAM_SUCCESS';
export const TEAM_FAILURE = 'TEAM_FAILURE';

export const EDIT_CLUB ='EDIT_CLUB';
export const EDIT_CLUB_SUCCESS ='EDIT_CLUB_SUCCESS ';
export const EDIT_CLUB_FAILURE ='EDIT_CLUB_FAILURE ';
export const ON_CHANGE_VALUE_CLUB ='ON_CHANGE_VALUE_CLUB ';
export const RESET_AUCTION ='RESET_AUCTION ';

export const DELETE_OR_INACTIVE = 'DELETE_OR_INACTIVE';
export const DELETE_OR_INACTIVE_SUCCESS = 'DELETE_OR_INACTIVE_SUCCESS';
export const DELETE_OR_INACTIVE_FAILURE = 'DELETE_OR_INACTIVE_FAILURE';

export const GET_TOURNAMENT_DETAIL_OF_AUCTION = 'GET_TOURNAMENT_DETAIL_OF_AUCTION';
export const GET_TOURNAMENT_DETAIL_OF_AUCTION_SUCCESS = 'GET_TOURNAMENT_DETAIL_OF_AUCTION_SUCCESS';
export const GET_TOURNAMENT_DETAIL_OF_AUCTION_FAILURE = 'GET_TOURNAMENT_DETAIL_OF_AUCTION_FAILURE';
export const UN_SOLD_PLAYER = 'UN_SOLD_PLAYER';



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

export function getPendingTournamentListSuccess(data) {
  return {
      type: GET_PENDING_TOURNAMENT_LIST_GLOBAL_SUCCESS,
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



export function getAuctionPlayer() {
  return {
      type: GET_AUCTION_PLAYER,
  };
}

export function getAuctionPlayerSuccess(data) {
  return {
      type: GET_AUCTION_PLAYER_SUCCESS,
      data: data
  };
}
export function getAuctionPlayerFailure(err) {
  toast.error(err);
  return {
      type: GET_AUCTION_PLAYER_FAILURE,
      data: err
  };
}
export function getTournamentDetailOfAuction() {
  return {
      type: GET_TOURNAMENT_DETAIL_OF_AUCTION,
  };
}

export function getTournamentDetailOfAuctionSuccess(data) {
  return {
      type: GET_TOURNAMENT_DETAIL_OF_AUCTION_SUCCESS,
      data: data
  };
}
export function getTournamentDetailOfAuctionFailure(err) {
  toast.error(err);
  return {
      type: GET_TOURNAMENT_DETAIL_OF_AUCTION_FAILURE,
      data: err
  };
}


export function addPlayerToTeam() {
  return {
      type: ADD_PLAYER_TO_TEAM,
  };
}

export function addPlayerToTeamrSuccess(data) {
  return {
      type: ADD_PLAYER_TO_TEAM_SUCCESS,
      data: data
  };
}
export function addPlayerToTeamFailure(data) {
  toast.error(data);
  return {
      type: ADD_PLAYER_TO_TEAM_FAILURE,
      data: data
  };
}

export function setToast(success,message) {
  return {
      type: SET_TOAST,
      message: message,
      success
  };
}

export function resetToast(success,message) {
  return {
      type: RESET_TOAST,
      message: message,
      success
  };
}


export function getUserListSuccess(data) {
  return {
      type: GET_USER_LIST_GLOBAL_SUCCESS,
      data: data
  };
}

export function getUserList(data) {
  return {
      type: GET_USER_LIST_GLOBAL,
      data: data
  };
}


export function getUserListFailure(err) {
  toast.error(err);
  return {
      type: GET_USER_LIST_GLOBAL_FAILURE,
  };
}

export function getUserDetail() {
  return {
      type: GET_USER_DETAIL,
  };
}

export function getUserDetailSuccess(data) {

  return {
      type: GET_USER_DETAILL_SUCCESS,
      data
  };
}

export function getUserDetailFailure(err) {
  toast.error(err);
  return {
      type: GET_USER_DETAIL_FAILURE,
  };
}

export function onChangeValueProfile(evt) {
  return {
    type: ON_CHANGE_VALUE_PROFILE,
    id: (!evt.target.id) ? evt.target.name : evt.target.id,
    value: evt.target.value,
    };
}
export function editProfile() {
  return {
      type: PROFILE_EDIT,
  };
}
export function editProfileSuccess(data) {
  toast.success("profile submited SuccessFully");
  return {
      type: PROFILE_EDIT_SUCCESS,
      data: data
  };
}
export function editProfileFailure(err) {
  console.log('err', err)
  toast.error(err);
  return {
      type: PROFILE_EDIT_FAILURE,
  };
}

export function getPlayerTeamList() {
  return {
      type: GET_PLAYER_TEAM_LIST,
  };
}

export function getPlayerTeamListSuccess(data) {

  return {
      type: GET_PLAYER_TEAM_LIST_SUCCESS,
      data
  };
}

export function getPlayerTeamListFailure(err) {
  toast.error(err);
  return {
      type: GET_PLAYER_TEAM_LIST_FAILURE,
  };
}

export function createAuction() {
  return {
      type: CREATE_AUCTION,
  };
}

export function createAuctionSuccess(data) {
  return {
      type: CREATE_AUCTION_SUCCESS,
      data: data
  };
}
export function createAuctionFailure(err) {
  toast.error(err);
  return {
      type: CREATE_AUCTION_FAILURE,
      err
  };
}


export function uploadPhoto(data, fileId, key) {
  return {
      type: UPLOAD_PHOTO,
      data,
      fileId,
      key
  };
}

export function uploadPhotoSuccess(data) {
  return {
      type: UPLOAD_PHOTO_SUCCESS,
      data: data
  };
}
export function uploadPhotoFailure(err) {
  toast.error(err);
  return {
      type: UPLOAD_PHOTO_FAILURE,
  };
}

export function logout(err) {
  toast.success('Logout succesfully');
  return {
      type: ON_LOG_OUT,
  };
}


export function setOverlayLoading(data) {

  return {
      type: SET_OVERLAY_LOADING,
      value: data
  };
}

export function insertOrUpdateTeam() {
  return {
      type: TEAM,
  };
}
export function insertOrUpdateTeamSuccess(data) {
  toast.success("Team submited SuccessFully");
  return {
      type: TEAM_SUCCESS,
      data: data
  };
}
export function insertOrUpdateTeamFailure(err) {
  console.log('err', err)
  toast.error(err);
  return {
      type: TEAM_FAILURE,
  };
}


export function editClub() {
  return {
      type: EDIT_CLUB,
  };
}

export function editClubSuccess(data) {
  return {
      type: EDIT_CLUB_SUCCESS,
      data: data
  };
}
export function editClubFailure(err) {
  toast.error(err);
  return {
      type: EDIT_CLUB_FAILURE,
      err
  };
}


export function onChangeGlobalValueClub(evt) {
  return {
    type: ON_CHANGE_VALUE_CLUB,
    id: (!evt.target.id) ? evt.target.name : evt.target.id,
    value: evt.target.value,
    };
}

export function resetAuction(err) {

  return {
      type: RESET_AUCTION,
  };
}


export function deleteOrInActive() {
  return {
      type: DELETE_OR_INACTIVE
  };
}

export function deleteOrInActiveSuccess(type) {
  toast.success("Deleted "+ type + " successFully");
  return {
      type: DELETE_OR_INACTIVE_SUCCESS,
  };
}

export function deleteOrInActiveFailure(err) {
  console.log('err', err)
  toast.error(err);
  return {
      type: DELETE_OR_INACTIVE_FAILURE,
  };
}

export function unSoldPlayer() {
  return {
      type: UN_SOLD_PLAYER
  };
}
