import { SET_CURRENT_RIDE } from "../actions";

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_RIDE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
