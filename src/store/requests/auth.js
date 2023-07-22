import apiClient from "http/http-common";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "../reducers/auth";

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await apiClient.post("/auth/login", user, {
      withCredentials: true,
    });
    console.log(res?.data);
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
    await axiosJWT.post("/auth/logout", {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("logout haha");
    dispatch(logoutSuccess(null));
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};
