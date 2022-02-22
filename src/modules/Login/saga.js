import { put, all, call, takeLatest } from "redux-saga/effects";
import {
  LOGIN
} from "./actions";
import { request } from '../utils/request';

export function* login() {
  var requestURL = 'http://127.0.0.1:10020/apiService/authenticate'
  let loginCredentials = {
    "username": "renjith.nair95@gmail.com",
    "password": "renjithNair"
  }
  try {
    var options = {
      method: 'POST',
      body: loginCredentials
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)

  }
  catch (err) {
    console.log('err', err)

  }
}


// // bookAdd Watcher
// export function* initializeRegisterSagaWatchers() {
//   const watcher1 = yield fork(loginWatcher);
// }

// export default [
// 	initializeRegisterSagaWatchers,
// ];

export default function* bookAddSaga() {
  yield all([
    takeLatest('LOGIN', login),

  ]);
}