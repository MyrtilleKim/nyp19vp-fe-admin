import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    isFetching: false,
    error: false,
    mgsUser: null,
  },
  reducers: {
    getUsersStart: (state, action) => {
      state.user = action.payload;
    },
    getUsersSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    getUsersFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailed } = user.actions;

export default user.reducer;
