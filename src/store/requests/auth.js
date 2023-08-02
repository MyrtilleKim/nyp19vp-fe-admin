import apiClient from "http/http-common";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "../reducers/auth";

export const refeshToken = async (user, dispatch) => {
  try {
    const res = await apiClient.get("/auth/refresh", {
      withCredentials: true,
    });
    const refeshUser = {
      ...user,
      accessToken: res?.data.accessToken,
    };
    dispatch(loginSuccess(refeshUser));
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await apiClient.post("/auth/login", user, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res?.data));
    return res?.data;
  } catch (error) {
    dispatch(loginFailed(error.response.data));
    return error;
  }
};

export const logoutUser = async (token, dispatch, navigate, axiosJWT) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};
