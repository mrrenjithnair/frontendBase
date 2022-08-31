
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request, toURLString } from '../utils/request';
import {getError,} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';
import * as globalActions from '../Global/actions';

export function* getClubList() {
  var requestURL = CONFIG.apiURL + '/apiService/club'
  const state = yield select();
  const login = state.login
  const global = state.global
  const clubs = state.clubs
	// const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  let params ={}
  params.userId = userId

  if(!global.nearByClub && !global.clubListPage){
    params.approved = 1
  }
  if (global.loggedInRoleId == 1) {
    params.superAdmin = true
  }
  if(global.assignedClub&& 1 != global.loggedInRoleId){
    params.assigned = true
  }
  if(clubs.clubSearch){
    params.clubSearch = clubs.clubSearch
  }
  requestURL = requestURL + toURLString(params)
  try {
    var options = {
      method: 'GET',
    	sessionToken: sessionToken,
    };
    yield put(globalActions.setOverlayLoading(true));

    const ClubList = yield call(request, requestURL, options);
    yield put(actions.getClubListSuccess(ClubList));
    yield put(globalActions.setOverlayLoading(false));

  }
  catch (err) {
    yield put(actions.getClubListFailure(getError(err)));
    yield put(globalActions.setOverlayLoading(false));


  }
}


export function* addClub() {
  var requestURL = CONFIG.apiURL + '/apiService/club'
  const state = yield select();
  const sessionToken = state.global.sessionToken

  let clubBody = {
    "name": state.clubs.name,
    "location": state.clubs.location,
    "sportType": 1,
    "address": state.clubs.address,
    "logo": state.clubs.logo,
    "banner": state.clubs.banner,
    "description": state.clubs.description,
    "contact": state.clubs.contact,
    
}
  if (state.clubs.logo)
    clubBody.logo = state.clubs.logo
  if (state.clubs.banner)
    clubBody.banner = state.clubs.banner
  try {
    var options = {
      method: 'POST',
      body: clubBody,
      sessionToken: sessionToken,
    };
    yield put(globalActions.setOverlayLoading(true));

    const currentUser = yield call(request, requestURL, options);

    yield put(actions.addClubSuccess(currentUser));
    yield put(actions.getClubList(currentUser));
    yield put(globalActions.setOverlayLoading(false));

    history.push('/clubList')
  }
  catch (err) {
    yield put(actions.addClubFailure(getError(err)));
    yield put(globalActions.setOverlayLoading(false));


  }
}

export function* joinClub() {
  var requestURL = CONFIG.apiURL + '/apiService/joinClubOrApprove'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  const userId = state.global.loggedInUseId
  const selectedClub = state.global.selectedClub
  let clubBody = {
    "clubId": selectedClub,
    "userId": parseInt(userId),
}
  try {
    var options = {
      method: 'POST',
      body: clubBody,
      sessionToken: sessionToken,
    };
    yield put(globalActions.setOverlayLoading(true));

    const club = yield call(request, requestURL, options);
    yield put(actions.getClubList());
    yield put(actions.joinClubSuccess(club));
    yield put(globalActions.setOverlayLoading(false));


  }
  catch (err) {
    yield put(globalActions.setOverlayLoading(false));
    yield put(actions.joinClubFailure(getError(err)));

  }
}


export default function* clubListSaga() {
  yield all([
    takeLatest('GET_CLUB_LIST', getClubList),
    takeLatest('CLUB_ADD', addClub),
    takeLatest('JOIN_CLUB', joinClub),
    

  ]);
}