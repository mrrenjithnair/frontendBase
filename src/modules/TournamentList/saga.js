
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request, toURLString } from '../utils/request';
import {getError,} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';
export function* getTournamentList() {
  var requestURL = CONFIG.apiURL + '/apiService/tournament'
  const state = yield select();
  const login = state.login
  const global = state.global
	// const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  let params ={}
  if(!global.nearByTournament && !global.tournamentListPage){
    params.userId = userId
    params.approved = 1
  }
  if(global.tournamentListPage){
    params.superAdmin = true
  }
  if(global.assignedClub){
    params.assigned = true
  }
  console.log('params',params)

  requestURL = requestURL + toURLString(params)
  try {
    var options = {
      method: 'GET',
    	sessionToken: sessionToken,
    };
    const TournamentList = yield call(request, requestURL, options);
    console.log('TournamentList', TournamentList)
    yield put(actions.getTournamentListSuccess(TournamentList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getTournamentListFailure(getError(err)));

  }
}


export function* addClub() {
  var requestURL = CONFIG.apiURL + '/apiService/club'
  const state = yield select();
  const sessionToken = state.global.sessionToken

  console.log(state)
  let clubBody = {
    "name": state.clubs.name,
    "location": state.clubs.location,
    "sportType": 1,
    "address": state.clubs.address,
}
  try {
    var options = {
      method: 'POST',
      body: clubBody,
      sessionToken: sessionToken,
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.addClubSuccess(currentUser));
    history.push('/tournamentList')
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.addClubFailure(getError(err)));

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
    const club = yield call(request, requestURL, options);
    yield put(actions.getTournamentList());
    yield put(actions.joinClubSuccess(club));

  }
  catch (err) {
    console.log('err', err)
    yield put(actions.joinClubFailure(getError(err)));

  }
}


export default function* tournamentListSaga() {
  yield all([
    takeLatest('GET_TOURNAMENT_LIST', getTournamentList),
    takeLatest('TOURNAMENT_ADD', addClub),
    takeLatest('JOIN_TOURNAMENT', joinClub),
    

  ]);
}