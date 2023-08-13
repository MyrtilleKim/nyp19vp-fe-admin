import apiClient from "http/http-common";

import { formatDate, formatCurrency } from "./user.js";
import { setCounter, setInitPackage } from "store/reducers/package.js";

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
export const statisticTrans = async (dispatch) => {
  try {
    const res = await apiClient.get(`/txn/statistic`);
    const revenueByMonth = res?.data.data?.revenueByMonth;
    const revenueByWeek = res?.data.data?.revenueByWeek;
    const txnByMonth = res?.data.data?.txnByMonth;
    const txnByWeek = res?.data.data?.txnByWeek;
    const monthlyRevenue = revenueByMonth.data[10]
      ? (
          ((revenueByMonth.data[11].y - revenueByMonth.data[10].y) /
            revenueByMonth.data[10].y) *
          100
        ).toFixed(2)
      : null;
    const weeklyRevenue = revenueByWeek.data[10]
      ? (
          ((revenueByWeek.data[11].y - revenueByWeek.data[10].y) /
            revenueByWeek.data[10].y) *
          100
        ).toFixed(2)
      : null;
    const monthlyTxn = txnByMonth.data[10]
      ? (
          ((txnByMonth.data[11].y - txnByMonth.data[10].y) /
            txnByMonth.data[10].y) *
          100
        ).toFixed(2)
      : null;
    const weeklyTxn = txnByWeek.data[10]
      ? (
          ((txnByWeek.data[11].y - txnByWeek.data[10].y) /
            txnByWeek.data[10].y) *
          100
        ).toFixed(2)
      : null;
    const payload = {
      countTxn: res?.data.data?.countTxn,
      countDeletedTxn: res?.data.data?.countDeletedTxn,
      countWithDeletedTxn: res?.data.data?.countWithDeletedTxn,
      txnByMonth: txnByMonth,
      txnByWeek: txnByWeek,
      totalRevenue: res?.data.data?.totalRevenue,
      revenueByMonth: revenueByMonth,
      revenueByWeek: revenueByWeek,
      pkgByMonth: res?.data.data?.pkgByMonth,
      pkgByWeek: res?.data.data?.pkgByWeek,
      period: res?.data.data?.period,
      ratio: {
        monthlyTxn: monthlyTxn,
        weeklyTxn: weeklyTxn,
        monthlyRevenue: monthlyRevenue,
        weeklyRevenue: weeklyRevenue,
      },
    };
    console.log("statistic trans", res);
    dispatch(setCounter(payload));
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function MonthlyLabels() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Tạo mảng chứa các chuỗi tháng/năm theo thứ tự ngược lại
  const numberOfMonths = 12; // Số tháng trong năm
  const monthYearArray = [];

  for (let i = numberOfMonths - 1; i >= 0; i--) {
    const month = currentDate.getMonth() - i;
    const year = currentYear + Math.floor(month / 12);
    const monthNum = (month < 0 ? month + 12 : month) + 1;
    const formattedDate = padTo2Digits(monthNum) + `/${year}`;
    monthYearArray.push(formattedDate);
  }

  return monthYearArray;
}

export function DailyLabels() {
  const currentDate = new Date();

  // Tạo mảng chứa các chuỗi ngày trong tuần theo thứ tự ngược lại
  const numberOfDays = 7; // Số ngày trong một tuần
  const dayOfWeek = currentDate.getDay(); // Lấy ngày trong tuần của ngày hiện tại
  const dayArray = [];

  for (let i = numberOfDays - 1; i >= 0; i--) {
    const pastDay = new Date(currentDate);
    pastDay.setDate(currentDate.getDate() - (dayOfWeek - i));
    const formattedDate = `${pastDay.getDate()}/${
      pastDay.getMonth() + 1
    }/${pastDay.getFullYear()}`;
    dayArray.push(formattedDate);
  }

  return dayArray;
}
