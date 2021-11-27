import { uiActions } from "../slice/ui-slice";
import { orderActions } from "../slice/order-slice";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.loader());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch(
      orderActions.orderCreate({
        orderData: data,
      })
    );
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        message: error.response.data.message,
      })
    );
  }
  dispatch(orderActions.loader());
};

export const getMyOrders = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(orderActions.loader());
      const response = await fetch("/api/v1/orders/me");

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const orderData = await fetchData();

      dispatch(
        orderActions.myOrders({
          myOrdersData: orderData.orders,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(orderActions.loader());
  };
};

export const getMyOrderDetails = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(orderActions.loader());
      const response = await fetch(`/api/v1/order/${id}`);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const orderData = await fetchData();

      dispatch(
        orderActions.orderDetails({
          order: orderData.order,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(orderActions.loader());
  };
};
