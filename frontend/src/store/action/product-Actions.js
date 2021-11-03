import { uiActions } from "../slice/ui-slice";
import { productActions } from "../slice/product-Slice";
import { productDetailsActions } from "../slice/productDetails-slice";
export const getProducts = (
  keyword = "",
  currentPage = 1,
  price,
  category,
  rating = 0
) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productActions.loader());
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
      }
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();

      return data;
    };

    try {
      const productData = await fetchData();

      dispatch(
        productActions.allProduct({
          products: productData.products || [],
          productCount: productData.productCount,
          resPerPage: productData.resPerPage,
          filteredProductsCount: productData.filteredProductsCount,
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
      dispatch(productDetailsActions.loader());
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
        productDetailsActions.productDetails({
          product: productData.product || {},
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productDetailsActions.loader());
  };
};
