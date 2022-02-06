import { combineReducers } from "redux";
import loginReducer from "../Login/reducer";


export const mainReducer = combineReducers({
  login: loginReducer,
});
