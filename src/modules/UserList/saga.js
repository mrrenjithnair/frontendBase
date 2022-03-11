
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request } from '../utils/request';
import {getError,} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';
export function* getUserList() {
  var requestURL = CONFIG.apiURL + '/apiService/player'
  const state = yield select();
  const login = state.login
  const global = state.global
  console.log('getUserList', global)

	// const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  // if(!global.nearByClub){
  //   requestURL += '?userId='+userId

  // }
  try {
    var options = {
      method: 'GET',
    	sessionToken: sessionToken,
    };
    const UserList = yield call(request, requestURL, options);
    console.log('UserList', UserList)
    yield put(actions.getUserListSuccess(UserList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getUserListFailure(getError(err)));

  }
}


export function* addClub() {
  var requestURL = CONFIG.apiURL + '/apiService/club'
  const state = yield select();
  const sessionToken = localStorage.getItem("token");
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
    history.push('/userList')
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.addClubFailure(getError(err)));

  }
}


export default function* userListSaga() {
  yield all([
    takeLatest('GET_USER_LIST', getUserList),
    takeLatest('CLUB_ADD', addClub),


  ]);
}