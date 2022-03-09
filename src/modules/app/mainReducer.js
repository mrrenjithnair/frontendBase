import { combineReducers } from "redux";
import loginReducer from "../Login/reducer";
import registerReducer from "../Register/reducer";
import clubListReducer from "../ClubList/reducer";


export const mainReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  clubs:clubListReducer
});
