import { combineReducers } from "redux";

import product from "./products";
import sell from "./sells";

export default combineReducers({
  product,
  sell,
});
