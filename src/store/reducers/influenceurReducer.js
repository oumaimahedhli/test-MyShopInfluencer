import { GET_INFLUENCEUR } from "../actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_INFLUENCEUR:
      return action.payload;
    default:
      return state;
  }
}