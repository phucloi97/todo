import { CLEAR_ERRORS, GET_ERRORS } from "../actions/types";

const initalState = {
  msg: {},
  status: null,
  id: null,
};
//cung cap loi qua trinh login or register
export default function (state = initalState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS: {
      return {
        msg: {},
        status: null,
        id: null,
      };
    }
    default:
      return state;
  }
}
