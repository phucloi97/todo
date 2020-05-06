import axios from "axios";
import { returnErrors } from "../actions/errorActions";

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
  //get token from localstorage (lay trong store)
  const token = getState().auth.token;
  console.log(token);
  // headers
  // console.log(token);
  // // if token add header
  const config = {
    headers: {
      "conten-type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  axios
    .get("/api/auth/user", config)
    .then((res) => {
      return dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//register use
export const register = ({ name, email, password }) => (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  console.log(body);
  axios
    .post("/api/users/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

//logout user

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
//login user

export const login = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  axios
    .post("/api/auth", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.status);
      dispatch(
        returnErrors(
          err.response.data.massage,
          err.response.status,
          "LOGIN_FAIL"
        )
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
