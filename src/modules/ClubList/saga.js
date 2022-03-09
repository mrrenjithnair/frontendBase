
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request } from '../utils/request';
import {getError,} from '../utils/commonUtils';
import history from "../utils/history";

export function* getClubList() {
  var requestURL = ' http://127.0.0.1:10020/apiService/club'
  const state = yield select();
  const login = state.login
	// const sessionToken = login.get("currentUser").token;
  const sessionToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  requestURL += '?userId='+userId
  try {
    var options = {
      method: 'GET',
    	sessionToken: sessionToken,
    };
    const ClubList = yield call(request, requestURL, options);
    console.log('ClubList', ClubList)
    yield put(actions.getClubListSuccess(ClubList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getClubListFailure(getError(err)));

  }
}

export default function* clubListSaga() {
  yield all([
    takeLatest('GET_CLUB_LIST', getClubList),

  ]);
}