import apiClient from "http/http-common";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "../reducers/auth";
import { HttpStatusCode } from "axios";

export const refeshToken = async (user, dispatch, navigate) => {
  try {
    const res = await apiClient.get("/auth/refresh", {
      withCredentials: true,
    });
    if (res?.data.statusCode === HttpStatusCode.Ok) {
      const refeshUser = {
        ...user,
        accessToken: res?.data.accessToken,
      };
      console.log("refresh", res?.data.accessToken);
      dispatch(loginSuccess(refeshUser));
      return res?.data;
    } else if (res?.data.statusCode === HttpStatusCode.Unauthorized) {
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    navigate("/login");
  }
};

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await apiClient.post("/auth/login", user, {
      withCredentials: true,
    });
    const payload = {
      accessToken: res?.data.accessToken,
      data: {
        auth: res?.data.data?.auth,
        userInfo: res?.data.data?.userInfo,
      },
    };
    dispatch(loginSuccess(payload));
    return res?.data;
  } catch (error) {
    dispatch(loginFailed(error.response.data));
    return error;
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    const res = await apiClient.post(
      "auth/logout",
      {},
      { withCredentials: true }
    );
    if (res?.data.statusCode === 200) {
      console.log("logout", res?.data);
      dispatch(logoutSuccess());
      navigate("/login");
    }
  } catch (error) {
    dispatch(logoutFailed());
  }
};
