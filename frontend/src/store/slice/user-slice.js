import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
  },
  reducers: {
    updateProfile(state, action) {
      state.isUpdated = action.payload.isUpdated;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    forgot(state, action) {
      state.message = action.payload.message;
    },
    newPassword(state, action) {
      state.success = action.payload.success;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
