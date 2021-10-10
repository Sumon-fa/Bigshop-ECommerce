import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "allProduct",
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {
    allProductCart(state, action) {
      state.productCount = action.payload.productCount;
      state.products = action.payload.products;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    productDetails(state, action) {
      state.products = action.payload.products;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
