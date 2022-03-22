import { combineReducers } from "redux";
import loginReducer from "../Login/reducer";
import registerReducer from "../Register/reducer";
import clubListReducer from "../ClubList/reducer";
import globalReducer from "../Global/reducer";
import userReducer from "../UserList/reducer";
import tournamentReducer from "../TournamentList/reducer";


export const mainReducer = combineReducers({
  global: globalReducer,
  login: loginReducer,
  register: registerReducer,
  clubs:clubListReducer,
  userList: userReducer,
  tournament :tournamentReducer,
});
