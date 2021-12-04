import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import submissions from "./submissions/reducer";
import challenges from "./challenges/reducer";
export default combineReducers({
  appState,
  user,
  submissions,
  challenges,
});
