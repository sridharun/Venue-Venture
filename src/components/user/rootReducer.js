import { combineReducers } from "redux";
import userReducer from "./auth/userReducers";

export const rootReducer = combineReducers({
  auth: userReducer,
});

export default rootReducer;