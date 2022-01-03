import { GET_BRANDS } from "../actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_BRANDS:
      return action.payload;
    default:
      return state;
  }
}