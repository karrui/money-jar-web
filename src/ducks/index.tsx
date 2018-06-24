import { combineReducers } from "redux";
import session from "./session";
import user from "./user";

const rootReducer = combineReducers({
  session,
  user
});

export default rootReducer;
