import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    isLoading: false,
    review: [],
    newReview: {},
  },
  reducers: {
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    prodoctReview(state, action) {
      state.review = action.payload.review;
    },
    newProductReview(state, action) {
      state.newReview = action.payload.newReview;
    },
  },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice;
