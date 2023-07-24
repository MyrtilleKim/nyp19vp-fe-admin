import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    trans: [],
  },
  reducers: {
    getInitUser: (state, action) => {
      state.userInfo = action.payload;
    },
    getInitTrans: (state, action) => {
      state.trans = action.payload;
    },
  },
});

export const { getInitUser, getInitTrans } = user.actions;

export default user.reducer;
