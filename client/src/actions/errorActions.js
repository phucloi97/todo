import { CLEAR_ERRORS, GET_ERRORS } from "../actions/types";

//return error
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

//clear error
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
