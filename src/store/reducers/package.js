import { createSlice } from "@reduxjs/toolkit";

const packages = createSlice({
  name: "packages",
  initialState: {
    packages: [],
    countTxn: 0,
    countDeletedTxn: 0,
    countWithDeletedTxn: 0,
    txnByMonth: {},
    txnByWeek: {},
    totalRevenue: 0,
    revenueByMonth: {},
    revenueByWeek: {},
    pkgByMonth: [],
    pkgByWeek: [],
    period: { min: null, max: null },
    ratio: {
      monthlyTxn: null,
      weeklyTxn: null,
      monthlyRevenue: null,
      weeklyRevenue: null,
    },
  },
  reducers: {
    reinitializeState: (state) => {
      return {
        packages: [],
        countTxn: 0,
        countDeletedTxn: 0,
        countWithDeletedTxn: 0,
        txnByMonth: {},
        txnByWeek: {},
        totalRevenue: 0,
        revenueByMonth: {},
        revenueByWeek: {},
        pkgByMonth: [],
        pkgByWeek: [],
        period: { min: null, max: null },
        ratio: {
          monthlyTxn: null,
          weeklyTxn: null,
          monthlyRevenue: null,
          weeklyRevenue: null,
        },
      }; // Return the initial state to reinitialize
    },
    setInitPackage: (state, action) => {
      state.packages = action.payload;
    },
    setCounter: (state, action) => {
      const {
        countTxn,
        countDeletedTxn,
        countWithDeletedTxn,
        txnByMonth,
        txnByWeek,
        totalRevenue,
        revenueByMonth,
        revenueByWeek,
        pkgByMonth,
        pkgByWeek,
        period,
        ratio,
      } = action.payload;
      state.countTxn = countTxn;
      state.countDeletedTxn = countDeletedTxn;
      state.countWithDeletedTxn = countWithDeletedTxn;
      state.txnByMonth = txnByMonth;
      state.txnByWeek = txnByWeek;
      state.totalRevenue = totalRevenue;
      state.revenueByMonth = revenueByMonth;
      state.revenueByWeek = revenueByWeek;
      state.pkgByMonth = pkgByMonth;
      state.pkgByWeek = pkgByWeek;
      state.period = period;
      state.ratio = ratio;
    },
  },
});

export const { setInitPackage, setCounter, reinitializeState } =
  packages.actions;

export default packages.reducer;
