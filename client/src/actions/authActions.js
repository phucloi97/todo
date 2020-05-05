import axios from "axios";
import { returnErrors } from '../actions/errorActions'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

//check token  and load user

export const loadUser = () => (dispatch, getState) => {
  //user Loading xu li ui
  dispatch({
    type: USER_LOADING,
  });

  //headers
  const config = {
    header: {
      "conten-type": "application/json",
    },
  };
  //if token add header
  if (token) {
    config.header["x-auth-token"] = token;
  }

  //get token from localstorage (lay trong store)
  const token = getState().auth.token;

  axios
    .get("/api/auth/user", config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
        dispatch(returnErrors(err.response.data, err.respone.status))
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
