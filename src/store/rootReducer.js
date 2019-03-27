import { combineReducers } from "redux";
import home from "./home/reducer";
import counter from "./counter/reducer";

export default combineReducers({
  home,
  counter
});
