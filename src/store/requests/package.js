import apiClient from "http/http-common";

import { formatDate, formatCurrency } from "./user.js";
import { setInitPackage } from "store/reducers/package.js";

export const getAllPackages = async (dispatch) => {
  try {
    const res = await apiClient.get("/pkg-mgmt/pkg/all");
    let dataPackage = [];
    for (let item of res.data) {
      item["coefficient_vnd"] = item.coefficient
        ? formatCurrency(item.coefficient)
        : null;
      item["price_vnd"] = formatCurrency(item.price);
      item.updatedAt = formatDate(item.updatedAt);
      item.createdAt = formatDate(item.createdAt);
      item.description = item.description.split(/[\r\n]+/);
      dataPackage.push(item);
    }
    console.log(dataPackage);
    dispatch(setInitPackage(dataPackage));
  } catch (error) {
    console.error(error);
  }
};
export const createPackage = async (newPackage, dispatch) => {
  try {
    const res = await apiClient.post(`pkg-mgmt/pkg`, newPackage);

    await getAllPackages(dispatch);

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updatePackage = async (newPackage, dispatch, pkgId) => {
  try {
    const res = await apiClient.put(`pkg-mgmt/pkg/${pkgId}`, newPackage);

    await getAllPackages(dispatch);

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};
export const removePackage = async (pkgId, dispatch) => {
  try {
    const res = await apiClient.delete(`pkg-mgmt/pkg/${pkgId}`);

    await getAllPackages(dispatch);

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};
export const restorePackage = async (pkgId, dispatch) => {
  try {
    const res = await apiClient.patch(`pkg-mgmt/pkg/${pkgId}`);

    await getAllPackages(dispatch);

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};
