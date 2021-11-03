import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "allProduct",
  initialState: {
    products: [],
    isLoading: false,
    productCount: 0,
    resPerPage: 0,
  },
  reducers: {
    allProduct(state, action) {
      state.productCount = action.payload.productCount;
      state.resPerPage = action.payload.resPerPage;
      state.products = action.payload.products;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
