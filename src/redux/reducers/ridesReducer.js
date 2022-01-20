import { FETCH_RIDES, UPDATE_RIDES } from "../actions";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_RIDES:
    case UPDATE_RIDES:
      return [...action.payload];
    default:
      return state;
  }
};

export default reducer;
