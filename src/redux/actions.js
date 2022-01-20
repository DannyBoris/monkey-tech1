import apiCall, { ENDPOINTS } from "../services/api";

export const FETCH_RIDES = "FETCH_RIDES";
export const UPDATE_RIDES = "UPDATE_RIDES";
const ridesActionCreator = ({ type, payload }) => ({ type, payload });

export const fetchRides = () => (dispatch) => {
  apiCall({ endpoint: ENDPOINTS.RIDES })
    .then((res) =>
      dispatch(ridesActionCreator({ type: FETCH_RIDES, payload: res }))
    )
    .catch((err) => console.log(err));
};

export const bookRide = (query, history) => (dispatch, getState) => {
  apiCall({
    endpoint: "tickets",
    method: "post",
    query,
  })
    .then((res) => {
      const { access_code, ride } = res;
      if (access_code) {
        // define new ride with 1 less ticket
        const newRide = {
          ...ride,
          remaining_tickets: ride.remaining_tickets - 1,
        };

        // set the confirmed ride in store
        dispatch({
          type: "SET_CURRENT_RIDE",
          payload: newRide,
        });

        // update the rides with new ticket count
        const newRides = [...getState().rides];
        const idx = newRides.findIndex((r) => r.id === ride.id);
        newRides.splice(idx, 1, newRide);
        dispatch({ type: UPDATE_RIDES, payload: newRides });

        // save users code for next time and redirect
        localStorage.setItem("USER_PIN", query.pin);
        history.push(`/${ride.id}`);
      } else {
        console.log(res.message);
      }
    })
    .catch((err) => console.log(err));
};
