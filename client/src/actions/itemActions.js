import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";
import axios from "axios";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading);
  axios.get("/api/items").then((res) => {
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
export const addItem = (name) => (dispatch) => {
  axios.post("/api/items", { name }).then((res) => {
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
