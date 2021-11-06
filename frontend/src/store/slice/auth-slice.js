import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    user: {},
    isAuthenticated: false,
    isLoading: false,
  },
  reducers: {
    authentication(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    userRegister(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
