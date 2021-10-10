import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/product-Slice";
import uiSlice from "./slice/ui-slice";

const store = configureStore({
  reducer: { products: productSlice.reducer, ui: uiSlice.reducer },
});

export default store;
