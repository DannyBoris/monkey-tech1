import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rides from "./ridesReducer";
import currentRide from "./currRideReducer";
const reducer = combineReducers({
  rides,
  currentRide,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
