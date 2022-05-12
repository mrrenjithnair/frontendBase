
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
  const club = state.global.loginClub
  let params ={}
  params.userId = userId
  params.list = true
  if (!global.nearByTournament && !global.tournamentListPage) {
    params.list = false
  }
  if(global.tournamentListPage){
    params.superAdmin = true
  }
  if(global.assignedClub){
    params.assigned = true
  }
  if(club && club[0] && club[0].id){
    params.clubId = parseInt(club[0].id)
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


export function* addTournament() {
  var requestURL = CONFIG.apiURL + '/apiService/tournament'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  const club = state.global.club
  if(!(club && club[0] && club[0].id)) return
  console.log(state)
  let clubBody = {
    "name": state.tournament.name,
    "startDate": new Date(state.tournament.startDate).valueOf(),
    "endDate": new Date(state.tournament.endDate).valueOf(),
    "teamTotal":  parseInt(state.tournament.teamTotal),
    "memberTotal":  parseInt(state.tournament.memberTotal),
    "clubId": parseInt(club[0].id)
}
  try {
    var options = {
      method: 'POST',
      body: clubBody,
      sessionToken: sessionToken,
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.addTournamentSuccess(currentUser));
    yield put(actions.getTournamentList());
    history.push('/tournamentList')
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.addTournamentFailure(getError(err)));

  }
}

export function* requestJoin() {
  var requestURL = CONFIG.apiURL + '/apiService/request'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  const userId = state.global.loggedInUseId
  const requestType = state.tournament.requestType
  const tournamentId = state.tournament.tournamentId
  const clubId = state.tournament.clubId
  
  const club = state.global.club
  let requestBody = {
    "userId": parseInt(userId),
    "type": requestType,
    "tournamentId": tournamentId,
    "clubId": clubId
  }

  try {
    var options = {
      method: 'POST',
      body: requestBody,
      sessionToken: sessionToken,
    };
    const club = yield call(request, requestURL, options);
    yield put(actions.getTournamentList());
    yield put(actions.requestJoinSuccess(club));

  }
  catch (err) {
    console.log('err', err)
    yield put(actions.requestJoinFailure(getError(err)));

  }
}


export default function* tournamentListSaga() {
  yield all([
    takeLatest('GET_TOURNAMENT_LIST', getTournamentList),
    takeLatest('TOURNAMENT_ADD', addTournament),
    takeLatest('JOIN_TOURNAMENT', requestJoin),
    

  ]);
}