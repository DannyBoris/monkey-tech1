const baseUrl = "http://fast-rider.herokuapp.com/api/v1/";
const token = "433898df4a3e992b8411004109e4d574a90695e39e";

export const ENDPOINTS = {
  RIDES: "rides",
  TICKETS: "tickets",
};

const apiCall = ({ endpoint, query = "", method = "get" }) => {
  if (query) query = handleQueryString(query);
  return fetch(`${baseUrl}/${endpoint}?token=${token}${query}`, {
    method,
  }).then((res) => res.json());
};

const handleQueryString = (query) => {
  return Object.entries(query).reduce((acc, [key, value]) => {
    return (acc += `&${key}=${value}`);
  }, "");
};

export default apiCall;
