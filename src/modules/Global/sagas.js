
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request, toURLString } from '../utils/request';
import { getError, } from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';

export function* clubDetails() {
  var requestURL = CONFIG.apiURL + '/apiService/club'
  const state = yield select();
  const global = state.global
  // const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  console.log('global', global)

  var params = {}
  if (userId) {
    params.userId = userId
  }

  if (global.selectedClub) {
    params.clubId = global.selectedClub
  }
  console.log('params', params)

  requestURL = requestURL + toURLString(params)
  try {
    var options = {
      method: 'GET',
      sessionToken: sessionToken,
    };
    const ClubList = yield call(request, requestURL, options);
    yield put(actions.getClubDetailSuccess(ClubList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getClubDetailFailed(getError(err)));

  }
}

export function* clubAdminList() {
  var requestURL = CONFIG.apiURL + '/apiService/clubAdmin'
  const state = yield select();
  const global = state.global
  // const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  var params = {}
  requestURL = requestURL + toURLString(params)
  try {
    var options = {
      method: 'GET',
      sessionToken: sessionToken,
    };
    const adminList = yield call(request, requestURL, options);
    let obj = { clubAdminList: adminList }
    yield put(actions.globalSuccess(obj));
  }
  catch (err) {
    yield put(actions.globalFailed(getError(err)));

  }
}
export function* getTournamentList() {
  var requestURL = CONFIG.apiURL + '/apiService/tournament'
  const state = yield select();
  const global = state.global
  // const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  const club = state.global.globalSelectedClub
  let params = {}
  params.userId = userId
  if (global.tournamentListPage) {
    params.cluAdmin = true
  }
  if (global.auction) {
    params.cluAdmin = true
    params.list = true
    params.auctionPending = true
    if (global.auctionTournamentId)
      params.tournamentId = parseInt(global.auctionTournamentId)
  }
  if (global.assignedClub) {
    params.assigned = true
  }
  if (club && club.id) {
    params.clubId = parseInt(club.id)
  }
  console.log('params', params)

  requestURL = requestURL + toURLString(params)
  try {
    var options = {
      method: 'GET',
      sessionToken: sessionToken,
    };
    const TournamentList = yield call(request, requestURL, options);
    console.log('TournamentList', TournamentList)
    if (global.auctionTournamentId) {
      yield put(actions.getTournamentDetail(TournamentList));

    } else {
      yield put(actions.getTournamentListSuccess(TournamentList));
    }
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getTournamentListFailure(getError(err)));

  }
}

export function* getAuctionPlayer() {
  var requestURL = CONFIG.apiURL + '/apiService/auctionPlayer'
  const state = yield select();
  const global = state.global
  // const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const club = state.global.globalSelectedClub
  let params = {}
  if (club && club.id) {
    params.clubId = parseInt(club.id)
  }
  if (global.auctionTournamentId)
    params.tournamentId = parseInt(global.auctionTournamentId)
  requestURL = requestURL + toURLString(params)
  try {
    var options = {
      method: 'GET',
      sessionToken: sessionToken,
    };
    const TournamentList = yield call(request, requestURL, options);
    console.log('TournamentList', TournamentList)
    yield put(actions.getAuctionPlayerSuccess(TournamentList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getAuctionPlayerFailure(getError(err)));

  }
}

export default function* globalSaga() {
  yield all([
    takeLatest('GET_CLUB_DETAIL', clubDetails),
    takeLatest('GET_CLUB_ADMINS', clubAdminList),
    takeLatest('GET_TOURNAMENT_LIST_GLOBAL', getTournamentList),
    takeLatest('GET_AUCTION_PLAYER', getAuctionPlayer),

  ]);
}