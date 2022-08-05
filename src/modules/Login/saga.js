
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import * as globalActions from '../Global/actions';
import { request } from '../utils/request';
import {getError,} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';
export function* login() {
  var requestURL = CONFIG.apiURL +'/apiService/authenticate'
  const state = yield select();
  let loginCredentials = {
    "username": state.login.username,
    "password": state.login.password,
  }
  if (state.login.socialLogin) {
    loginCredentials.socialLogin = state.login.socialLogin;
    loginCredentials.socialLoginType = state.login.socialLoginType;
    loginCredentials.socialLoginData = state.login.socialLoginData;
  }
  try {
    var options = {
      method: 'POST',
      body: loginCredentials
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.onLoginSuccess(currentUser));
    yield put(globalActions.onChangeValueGlobal({ target: { id: 'sessionToken', value: currentUser.token } }))
    yield put(globalActions.onChangeValueGlobal({ target: { id: 'myDetails', value: currentUser.user } }))
    if (currentUser.user && currentUser.user.club && currentUser.user.club.length > 0) {
      yield put(globalActions.onChangeValueGlobal({ target: { id: 'globalSelectedClub', value: currentUser.user.club[0] } }))
    }
    history.push('/profile');
    yield put(globalActions.onChangeValueGlobal({ target: { id: 'profileIncomplte', value: true } }))
    if(currentUser && currentUser.user && currentUser.user.showProfile){
      history.push('/profile');
    }
    else{
      history.push('/home');
    }
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