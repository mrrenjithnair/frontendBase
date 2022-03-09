
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request } from '../utils/request';
import {getError,} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';

export function* login() {
  var requestURL = CONFIG.apiURL + '/apiService/authenticate'
  const state = yield select();
  let loginCredentials = {
    "username": state.login.username,
    "password": state.login.password
  }
  try {
    var options = {
      method: 'POST',
      body: loginCredentials
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.onLoginSuccess(currentUser));
    window.location = '/home';
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.onLoginFailure(getError(err)));

  }
}

export default function* bookAddSaga() {
  yield all([
    takeLatest('LOGIN', login),

  ]);
}