import apiClient from "http/http-common";
import { getInitUser } from "../reducers/user";

export const getAllUsers = async (dispatch) => {
  try {
    const res = await apiClient.get(`/auth`);
    let dataUser = [];
    for (let item of res.data.data) {
      item.userInfo["role"] = item.role.roleName;
      item.userInfo["status"] = item.status;
      item.userInfo.updatedAt = new Date(
        item.userInfo.updatedAt
      ).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      item.userInfo.createdAt = new Date(
        item.userInfo.createdAt
      ).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      dataUser.push(item.userInfo);
    }
    console.log(dataUser);
    dispatch(getInitUser(dataUser));
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async (token, file) => {
  try {
    const res = await apiClient.post("/file/upload-avatar", file, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAvatarUser = async (
  userID,
  token,
  data,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/users/${userID}/avatar`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    await getAllUsers(dispatch);
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateInfoUser = async (
  userID,
  token,
  user,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}`, user, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getAllUsers(dispatch);

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};
