
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
  if (global.loggedInRoleId == 1) {
    params.superAdmin = true
    delete params.userId
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
export function* addPlayerToTeam() {
  var requestURL = CONFIG.apiURL + '/apiService/auctionPlayer'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  const club = state.global.globalSelectedClub
  const global = state.global
  let clubBody = {
    "playerUserId": parseInt(global.auctionPlayerId),
    "teamId": parseInt(global.auctionTournamentTeamId),
    "tournamentId":parseInt(global.auctionTournamentId),
    "requestId":  parseInt(global.auctionRequestId),
    "bidAmount":  parseInt(global.auctionTournamentPlayerBindAmount),
  }
  try {
    var options = {
      method: 'POST',
      body: clubBody,
      sessionToken: sessionToken,
    };
    const result = yield call(request, requestURL, options);
    console.log('result', result)
    yield put(actions.addPlayerToTeamrSuccess(result));
    yield put(actions.getAuctionPlayer());
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.addPlayerToTeamFailure(getError(err)));

  }
}
export function* createAuction() {
  var requestURL = CONFIG.apiURL + '/apiService/auction'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  const club = state.global.globalSelectedClub
  const global = state.global
  let obj = {
    venue: global.auctionVenue,
    date:  new Date(global.auctionDate).valueOf(),
    type: global.auctionType,
    teamPoint: global.auctionTeamPoint,
    tournamentId: global.auctionCreateTournamentId,
    
  }
  if (global.auctionType == 'noCategory') {
    obj.pointJson = [{ min: global.auctionMinPoint, max: global.auctionMaxPoint }]
  } else if (global.auctionType == 'category') {
    obj.pointJson = [
      { category: 'A', min: global.auctionCategoryAMinPoint, max: global.auctionCategoryAMaxPoint },
      { category: 'B', min: global.auctionCategoryBMinPoint, max: global.auctionCategoryBMaxPoint },
      { category: 'C', min: global.auctionCategoryCMinPoint, max: global.auctionCategoryCMaxPoint },
    ]
  }
  try {
    var options = {
      method: 'POST',
      body: obj,
      sessionToken: sessionToken,
    };
    const result = yield call(request, requestURL, options);
    console.log('result', result)
    yield put(actions.createAuctionSuccess(result));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.createAuctionFailure(getError(err)));

  }
}
export function* getUserList() {
  const state = yield select();
  const global = state.global
  const club = state.global.globalSelectedClub
  const teamId = state.global.globalSelectedTeamId
  let params = {}

  var requestURL = CONFIG.apiURL + '/apiService/player'
  params.superAdmin = false
  if (club && club.id) {
    params.clubId = parseInt(club.id)
  }
  if (teamId) {
    params.teamId = parseInt(teamId)
  }
  requestURL = requestURL + toURLString(params)
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  try {
    var options = {
      method: 'GET',
      sessionToken: sessionToken,
    };
    const UserList = yield call(request, requestURL, options);
    yield put(actions.getUserListSuccess(UserList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getUserListFailure(getError(err)));

  }
}
export function* getUserDetail() {
  const state = yield select();
  const global = state.global
  const club = state.global.globalSelectedClub
  const teamId = state.global.globalSelectedTeamId
  let params = {}
  const playerProfile = state.global.loggedInRoleId ==  3
    var requestURL = CONFIG.apiURL + '/apiService/player'
  params.superAdmin = false
  if (club && club.id) {
    params.clubId = parseInt(club.id)
  }
  if (teamId && playerProfile) {
    params.teamId = parseInt(teamId)
  }
  const userId = localStorage.getItem("userId");

  if (userId) {
    params.userId = parseInt(userId)
  }
  requestURL = requestURL + toURLString(params)
  const sessionToken = global.sessionToken
  try {
    var options = {
      method: 'GET',
      sessionToken: sessionToken,
    };
    const UserList = yield call(request, requestURL, options);
    yield put(actions.getUserDetailSuccess(UserList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getUserDetailFailure(getError(err)));

  }
}

export function* getPlayerTeamList() {
  const state = yield select();
  const global = state.global
  let params = {}
  const playerProfile = state.global.loggedInRoleId ==  3
  var requestURL = CONFIG.apiURL + '/apiService/team'
  const userId = localStorage.getItem("userId");
  if (userId) {
    params.userId = parseInt(userId)
  }
  requestURL = requestURL + toURLString(params)
  const sessionToken = global.sessionToken
  try {
    var options = {
      method: 'GET',
      sessionToken: sessionToken,
    };
    const UserList = yield call(request, requestURL, options);
    yield put(actions.getPlayerTeamListSuccess(UserList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getPlayerTeamListFailure(getError(err)));

  }
}
export function* uploadPhoto() {
  var requestURL = CONFIG.apiURL + '/apiService/file'
  const state = yield select();
  const global = state.global
  // const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  const fileToUpload = global.fileToUpload
  const fileToUploadName = global.fileToUploadName
  
  if (!fileToUpload || fileToUpload == undefined) {
    return
  }
  const fileId = fileToUploadName
	var formData  = new FormData();
	formData.append('file', fileToUpload, fileId)
  try {
    const options = {
      method: 'FILEPOST',
      sessionToken: sessionToken,
      userID: userId,
      formData: formData,
    };
    const obj = yield call(request, requestURL, options);
    yield put(actions.uploadPhotoSuccess(obj));
  }
  catch (err) {
    yield put(actions.uploadPhotoFailure(getError(err)));

  }
}
export default function* globalSaga() {
  yield all([
    takeLatest('GET_CLUB_DETAIL', clubDetails),
    takeLatest('GET_CLUB_ADMINS', clubAdminList),
    takeLatest('GET_TOURNAMENT_LIST_GLOBAL', getTournamentList),
    takeLatest('GET_AUCTION_PLAYER', getAuctionPlayer),
    takeLatest('ADD_PLAYER_TO_TEAM', addPlayerToTeam),
    takeLatest('GET_USER_LIST_GLOBAL', getUserList),
    takeLatest('GET_USER_DETAIL', getUserDetail),
    takeLatest('GET_PLAYER_TEAM_LIST', getPlayerTeamList),
    takeLatest('CREATE_AUCTION', createAuction),
    takeLatest('UPLOAD_PHOTO', uploadPhoto),
    
  ]);
}