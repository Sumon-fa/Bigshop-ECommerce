import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "details",
  initialState: {
    product: { images: [] },
    isLoading: false,
  },
  reducers: {
    productDetails(state, action) {
      state.product = action.payload.product;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },
  },
});
export const productDetailsActions = productDetailsSlice.actions;
export default productDetailsSlice;
