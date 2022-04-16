import * as actionTypes from "../Constants/UserConstants";
import api from "../../Apis/api";
import { toast } from "react-toastify";
import {
  setAuthToken,
  removeAuthToken,
  setUser,
  removeUser,
  getUser as getUserId,
} from "../../Utils/Local";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_LOGIN_REQUEST });
    let reqData = { Email: email, Password: password };
    const { data } = await api.post("/users/login", { data: reqData });
    setAuthToken(data.data.token);
    setUser(data.data._id);
    dispatch({
      type: actionTypes.GET_LOGIN_SUCCESS,
      payload: data.data,
    });
    toast.success(`logged in successfully.`, {
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    window.location.reload();
  } catch (err) {
    toast.error(
      `${
        err.response?.data?.message
          ? err.response.data.message
          : "Something went wrong."
      }`,
      {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
    dispatch({
      type: actionTypes.GET_LOGIN_FAIL,
      payload: "something went wrong",
    });
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_LOGIN_REQUEST });
    const { data } = await api.post("/users/", {
      data: user,
      isCustomer: true,
    });
    setAuthToken(data.data.token);
    setUser(data.data._id);
    dispatch({
      type: actionTypes.GET_LOGIN_SUCCESS,
      payload: data.data,
    });
    toast.success(`registration successful.`, {
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    window.location.reload();
  } catch (err) {
    toast.error(
        `${
          err.response?.data?.message
            ? err.response.data.message
            : "Something went wrong."
        }`,
        {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    dispatch({
      type: actionTypes.GET_LOGIN_FAIL,
      payload: "something went wrong",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_LOGOUT_REQUEST });
    removeAuthToken();
    // removeUserDetails()
    removeUser();
    dispatch({
      type: actionTypes.GET_LOGOUT_SUCCESS,
    });
    dispatch({
      type: actionTypes.REMOVE_USER_DETAILS_SUCCESS,
    });
    toast.success(`logged out successfully.`, {
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } catch (err) {
    toast.error(
        `${
          err.response?.data?.message
            ? err.response.data.message
            : "Something went wrong."
        }`,
        {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    dispatch({
      type: actionTypes.GET_LOGOUT_FAIL,
      payload: "something went wrong",
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USER_DETAILS_REQUEST });
    let url = "/users/get/" + id;
    const { data } = await api.get(url);
    dispatch({
      type: actionTypes.GET_USER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    toast.error(
        `${
          err.response?.data?.message
            ? err.response.data.message
            : "Could not fetch user details."
        }`,
        {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    dispatch({
      type: actionTypes.GET_USER_DETAILS_FAIL,
      payload: "something went wrong",
    });
  }
};

export const editUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_USER_DETAILS_REQUEST });
    delete user.createdAt;
    delete user.updatedAt;
    delete user.LastLogin;
    delete user.__v;
    const { data } = await api.put("/users", { _id: user._id, data: user });
    dispatch({
      type: actionTypes.EDIT_USER_DETAILS_SUCCESS,
      payload: data.data,
    });
    toast.success(`User edited.`, {
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } catch (err) {
    toast.error(
      `${
        err.response?.data?.message
          ? err.response.data.message
          : "Something went wrong."
      }`,
      {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
    dispatch({
      type: actionTypes.EDIT_USER_DETAILS_FAIL,
      payload: "something went wrong",
    });
  }
};


export const getUserOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USER_ORDERS_REQUEST });
    let url = "/order/get/user/" + id;
    const { data } = await api.get(url);
    dispatch({
      type: actionTypes.GET_USER_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_USER_ORDERS_FAIL,
      payload: "something went wrong",
    });
  }
};

export const googleLogin = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_LOGIN_REQUEST });
    const { data } = await api.get("/auth/google");
    setAuthToken(data.data.token);
    setUser(data.data._id);
    dispatch({
      type: actionTypes.GET_LOGIN_SUCCESS,
      payload: data.data,
    });
    toast.success(`logged in successfully.`, {
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // window.location.reload();
  } catch (err) {
    toast.error(
      `${
        err.response?.data?.message
          ? err.response.data.message
          : "Something went wrong."
      }`,
      {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
    dispatch({
      type: actionTypes.GET_LOGIN_FAIL,
      payload: "something went wrong",
    });
  }
};