import { uiActions } from "../slice/ui-slice";
import { productActions } from "../slice/product-Slice";

export const getProducts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productActions.loader());
      const response = await fetch("/api/v1/products");
      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const data = await response.json();

      return data;
    };

    try {
      const productData = await fetchData();

      dispatch(
        productActions.allProductCart({
          products: productData.products || [],
          productCount: productData.productCount,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productActions.loader());
  };
};

export const getProductsDetails = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productActions.loader());
      const response = await fetch(`/api/v1/product/${id}`);
      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const data = await response.json();

      return data;
    };

    try {
      const productData = await fetchData();

      dispatch(
        productActions.productDetails({
          products: productData.products || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productActions.loader());
  };
};
