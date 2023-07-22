import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
  },
  reducers: {
    getInitUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { getInitUser } = user.actions;

export default user.reducer;
