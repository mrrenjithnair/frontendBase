import { combineReducers } from "redux";
import loginReducer from "../Login/reducer";
import registerReducer from "../Register/reducer";
import clubListReducer from "../ClubList/reducer";
import globalReducer from "../Global/reducer";


export const mainReducer = combineReducers({
  global: globalReducer,
  login: loginReducer,
  register: registerReducer,
  clubs:clubListReducer
});
