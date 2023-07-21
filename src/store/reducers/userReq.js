import apiClient from "http/http-common.js";
import { getUsersStart, getUsersSuccess, getUsersFailed } from "./user.js";

export const getInformationUser = async (dispatch) => {
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
    dispatch(getUsersSuccess(dataUser));
  } catch (error) {
    console.log(apiClient);
  }
};
