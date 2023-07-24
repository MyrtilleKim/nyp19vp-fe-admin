import { createSlice } from "@reduxjs/toolkit";

const packages = createSlice({
  name: "packages",
  initialState: {
    packages: [],
  },
  reducers: {
    setInitPackage: (state, action) => {
      state.packages = action.payload;
    },
  },
});

export const { setInitPackage } = packages.actions;

export default packages.reducer;
