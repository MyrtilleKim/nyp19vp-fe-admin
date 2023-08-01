import apiClient from "http/http-common";
import { getInitUser, getInitTrans } from "../reducers/user";

export const getAllUsers = async (dispatch) => {
  try {
    const res = await apiClient.get(`/auth`);
    let dataUser = [];
    for (let item of res.data.data) {
      item.userInfo["role"] = item.role.roleName;
      item.userInfo["status"] = item.status;
      item.userInfo.updatedAt = formatDate(item.userInfo.updatedAt);
      item.userInfo.createdAt = formatDate(item.userInfo.createdAt);
      item.userInfo.deletedAt = formatDate(item.userInfo.deletedAt);
      dataUser.push(item.userInfo);
    }
    dispatch(getInitUser(dataUser));
  } catch (error) {
    console.error(error);
  }
};

export const getAllTrans = async (dispatch) => {
  try {
    const res = await apiClient.get("/txn");
    let dataTrans = [];
    for (let item of res.data.data) {
      item["amount_vnd"] = formatCurrency(item.amount);
      item.item = item.item.map((i) => {
        i["price_vnd"] = formatCurrency(i.price);
        return i;
      });
      item["wallet"] = item.method.name;
      item.updatedAt = formatDate(item.updatedAt);
      item.createdAt = formatDatetime(item.createdAt);
      dataTrans.push(item);
    }
    dispatch(getInitTrans(dataTrans));
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async (token, file, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/file/upload-avatar", file, {
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

export const removeUser = async (userID, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.delete(`/users/${userID}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    await getAllUsers(dispatch);

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const restoreUser = async (userID, token, dispatch, axiosJWT) => {
  try {
    console.log("huhuhu", axiosJWT, token);
    const res = await axiosJWT.patch(
      `/users/${userID}`,
      {},
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await getAllUsers(dispatch);

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export function formatDate(dateISO) {
  return new Date(dateISO).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
export function formatShortDate(dateISO) {
  return new Date(dateISO).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
export function formatDatetime(dateISO) {
  return new Date(dateISO).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function formatCurrency(total) {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return VND.format(total);
}
