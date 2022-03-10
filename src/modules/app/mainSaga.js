import { all } from "redux-saga/effects";
import loginSaga from "../Login/saga";
import registerSaga from "../Register/saga";
import ClubListSaga from "../ClubList/saga";
import GlobalSaga from "../Global/sagas";


export function* mainSaga() {
  yield all([
    GlobalSaga(),
    loginSaga(),
    registerSaga(),
    ClubListSaga(),
  ]);
}