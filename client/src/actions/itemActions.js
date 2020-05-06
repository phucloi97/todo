import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";
import axios from "axios";

export const getItems = () => (dispatch, getState) => {
  dispatch(setItemsLoading);
  const token = getState().auth.token;
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
  axios.get("/api/items", config).then((res) => {
    return dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  });
};
export const deleteItem = (id) => (dispatch) => {
  //can cai thien lai
  axios.delete(`/api/items/${id}`).then((res) => {
    return dispatch({
      type: DELETE_ITEMS,
      payload: id,
    });
  });
};
export const addItem = (name) => (dispatch, getState) => {
  const token = getState().auth.token;
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
  axios.post("/api/items", { name }, config).then((res) => {
    return dispatch({
      type: ADD_ITEMS,
      payload: res.data,
    });
  });
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
