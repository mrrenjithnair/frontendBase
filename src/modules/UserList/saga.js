
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request, toURLString } from '../utils/request';
import { getError, } from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';
export function* getUserList() {
  const state = yield select();
  const global = state.global
  const club = state.global.globalSelectedClub
  let params = {}

  if (global.adminList) {
    var requestURL = CONFIG.apiURL + '/apiService/ClubAdmin'
    params.superAdmin = true
  } else {
    var requestURL = CONFIG.apiURL + '/apiService/player'
    params.superAdmin = false
    if (club && club.id) {
      params.clubId = parseInt(club.id)
    }
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


export function* addUser() {
  var requestURL = CONFIG.apiURL + '/apiService/clubAdmin'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  console.log(state)
  let clubBody = {
    "firstName": state.userList.firstName,
    "lastName": state.userList.lastName,
    "emailId": state.userList.emailId,
    "dob": new Date(state.userList.dob).valueOf(),
    "username": state.userList.username,
    "password": state.userList.password,
    "clubId": parseInt(state.userList.clubId),
  }
  try {
    var options = {
      method: 'POST',
      body: clubBody,
      sessionToken: sessionToken,
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.addUserSuccess(currentUser));
    yield put(actions.getUserList());

    history.push('/userList')
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.addUserFailure(getError(err)));

  }
}


export function* updateUser() {
  var requestURL = CONFIG.apiURL + '/apiService/player'
  const state = yield select();
  const sessionToken = state.global.sessionToken
  const selectedUser = state.userList.selectedUser
  let userBody = {
    "id":selectedUser.id,
    "firstName": selectedUser.firstName,
    "lastName": selectedUser.lastName,
    "emailId": selectedUser.emailId,
    "dob": new Date(selectedUser.dob).valueOf(),
    "username": selectedUser.username,
    "emailId": selectedUser.emailId,
    "roleId": selectedUser.roleId,
    "password": selectedUser.password,
    "clubId": parseInt(selectedUser.clubId),
    "approved": parseInt(selectedUser.approved),
    "approvedUpdate": selectedUser.approvedUpdate,
  }
  try {
    var options = {
      method: 'POST',
      body: userBody,
      sessionToken: sessionToken,
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.userUpdateSuccess(currentUser));
    yield put(actions.getUserList());

    history.push('/userList')
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.userUpdateFailure(getError(err)));

  }
}
export default function* userListSaga() {
  yield all([
    takeLatest('GET_USER_LIST', getUserList),
    takeLatest('USER_ADD', addUser),
    takeLatest('USER_UPDATE', updateUser),


  ]);
}