import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import submissions from "./submissions/reducer";
export default combineReducers({
  appState,
  user,
  submissions,
});
