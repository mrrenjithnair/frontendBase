import { all } from "redux-saga/effects";
import loginSaga from "../Login/saga";


export function* mainSaga() {
  yield all([
    loginSaga(),
  ]);
}