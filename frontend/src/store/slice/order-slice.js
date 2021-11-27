import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    orderData: {},
    myOrdersData: [],
    order: {},
  },
  reducers: {
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    orderCreate(state, action) {
      state.orderData = action.payload.orderData;
    },
    myOrders(state, action) {
      state.myOrdersData = action.payload.myOrdersData;
    },
    orderDetails(state, action) {
      state.order = action.payload.order;
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
