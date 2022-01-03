import { GET_PURCHASE } from "../actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PURCHASE:
      return action.payload;
    default:
      return state;
  }
}