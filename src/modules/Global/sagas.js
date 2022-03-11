
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
  const sessionToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  console.log('global',global)

  var params = {}
  // if (userId) {
  //   params.userId = userId
  // }

  if (global.selectedClub) {
    params.clubId = global.selectedClub
  }
  console.log('params',params)

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

export default function* globalSaga() {
  yield all([
    takeLatest('GET_CLUB_DETAIL', clubDetails),

  ]);
}