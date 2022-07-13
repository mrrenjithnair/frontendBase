import { all } from "redux-saga/effects";
import loginSaga from "../Login/saga";
import registerSaga from "../Register/saga";
import ClubListSaga from "../ClubList/saga";
import GlobalSaga from "../Global/sagas";
import UserListSaga from "../UserList/saga";
import TournamentListSaga from "../TournamentList/saga";
import RequestSaga from "../Request/saga";
import TournamentDetailSaga from "../TournamentDetails/saga";



export function* mainSaga() {
  yield all([
    GlobalSaga(),
    loginSaga(),
    registerSaga(),
    ClubListSaga(),
    UserListSaga(),
    TournamentListSaga(),
    RequestSaga(),
    TournamentDetailSaga()
  ]);
}