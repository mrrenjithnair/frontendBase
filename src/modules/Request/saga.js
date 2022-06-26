
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request, toURLString } from '../utils/request';
import {getError,exportKeyValue} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';
export function* getClubRequest() {
  var requestURL = CONFIG.apiURL + '/apiService/request'
  const state = yield select();
  const login = state.login
  const global = state.global
	// const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  const club = state.global.loginClub
  let params ={}

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
    const Request = yield call(request, requestURL, options);
    console.log('Request', Request)
    yield put(actions.getClubRequestSuccess(Request));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getClubRequestFailure(getError(err)));

  }
}


export function* addTournament() {
  var requestURL = CONFIG.apiURL + '/apiService/tournament'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  const club = state.global.myDetails.club
  if(!(club && club[0] && club[0].id)) return
  console.log(state,'addTournament')
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
    yield put(actions.getClubRequest());
    history.push('/requestList')
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.addTournamentFailure(getError(err)));

  }
}
export function* editTournament() {
  var requestURL = CONFIG.apiURL + '/apiService/tournament'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  let selectedTournament = state.tournament.selectedTournament
  const club = state.global.myDetails.club
  if(!(club && club[0] && club[0].id)) return
  console.log(state,'editTournament')
  let clubBody = exportKeyValue(selectedTournament)
  clubBody.clubId =  parseInt(club[0].id)
  try {
    var options = {
      method: 'POST',
      body: clubBody,
      sessionToken: sessionToken,
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.editTournamentSuccess(currentUser));
    yield put(actions.getClubRequest());
    history.push('/requestList')
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.editTournamentFailure(getError(err)));

  }
}


export function* requestAction() {
  var requestURL = CONFIG.apiURL + '/apiService/request'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  const userId = state.global.loggedInUseId
  const requestType = state.request.requestType
  const tournamentId = state.request.tournamentId
  const clubId = state.request.clubId
  const status = state.request.status
  const requestId = state.request.requestId
  
  const club = state.global.club
  let requestBody = {
    "userId": parseInt(userId),
    "type": requestType,
    "tournamentId": tournamentId,
    "clubId": clubId,
    'id':requestId
  }
  if (status) {
    requestBody.approved = status == 'accept' ? 1 : 0
  }

  try {
    var options = {
      method: 'POST',
      body: requestBody,
      sessionToken: sessionToken,
    };
    const club = yield call(request, requestURL, options);
    yield put(actions.getClubRequest());
    yield put(actions.requestActionSuccess(club));

  }
  catch (err) {
    console.log('err', err)
    yield put(actions.requestActionFailure(getError(err)));

  }
}


export default function* tournamentListSaga() {
  yield all([
    takeLatest('GET_CLUB_REQUEST', getClubRequest),
    takeLatest('TOURNAMENT_ADD', addTournament),
    takeLatest('TOURNAMENT_EDIT', editTournament),
    takeLatest('REQUEST_ACTION', requestAction),
    

  ]);
}