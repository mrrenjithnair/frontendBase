
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request } from '../utils/request';
import {getError,} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';

export function* register() {
  var requestURL = CONFIG.apiURL + '/apiService/player'
  const state = yield select();
  let registerBody = {
    "firstName": state.register.firstName,
    "lastName": state.register.lastName,
    "emailId": state.register.emailId,
    "dob": new Date(state.register.dob).valueOf(),
    "username": state.register.username,
    "password": state.register.password,
    "sportsTypeId": 1,
    "playerType": state.register.playerType,
    "mobile": parseInt(state.register.mobile),
    "city": state.register.village,
    "location": state.register.location,
    "category": state.register.category,
    "bio": state.register.bio,
}
  try {
    var options = {
      method: 'POST',
      body: registerBody
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.onRegisterSuccess(currentUser));
    window.location = '/home';
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.onRegisterFailure(getError(err)));

  }
}

export default function* registerSaga() {
  yield all([
    takeLatest('REGISTER', register),

  ]);
}