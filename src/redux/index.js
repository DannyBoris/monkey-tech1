import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rides from "./reducers/ridesReducer";
import currentRide from "./reducers/currRideReducer";
const reducer = combineReducers({
  rides,
  currentRide,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
