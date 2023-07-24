import apiClient from "http/http-common";

import { formatDate, formatCurrency } from "./user.js";
import { setInitPackage } from "store/reducers/package.js";

export const getAllPackages = async (dispatch) => {
  try {
    const res = await apiClient.get("/pkg-mgmt/pkg");
    let dataPackage = [];
    for (let item of res.data.data) {
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
