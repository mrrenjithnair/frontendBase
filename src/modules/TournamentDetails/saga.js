
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request, toURLString } from '../utils/request';
import {getError,exportKeyValue} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';
export function* getTournamentDetails() {
  var requestURL = CONFIG.apiURL + '/apiService/tournament'
  const state = yield select();
  const login = state.login
  const global = state.global
	// const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  const club = state.global.globalSelectedClub
  const selectedTournament = state.global.selectedTournament
  let params ={}
  params.userId = userId

  if(club && club.id){
    params.clubId = parseInt(club.id)
  }
  if(selectedTournament && selectedTournament.id){
    params.tournamentId = parseInt(selectedTournament.id) 
  }
  console.log('params',params)

  requestURL = requestURL + toURLString(params)
  try {
    var options = {
      method: 'GET',
    	sessionToken: sessionToken,
    };
    const TournamentDetails = yield call(request, requestURL, options);
    yield put(actions.getTournamentDetailsSuccess(TournamentDetails));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getTournamentDetailsFailure(getError(err)));

  }
}



export default function* TournamentDetailsSaga() {
  yield all([
    takeLatest('GET_TOURNAMENT_DETAIL', getTournamentDetails),
    

  ]);
}