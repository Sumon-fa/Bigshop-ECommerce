import React, { Fragment, useEffect } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "../store/action/product-Actions";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.products);
  const errorNotification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    if (errorNotification) {
      return alert.error(errorNotification);
    }

    dispatch(getProducts());
  }, [dispatch, alert, errorNotification]);

  return (
    <Fragment>
      <MetaData title="Buy Best Products Online" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container container-fluid">
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    numOfReviews={product.numOfReviews}
                    ratings={product.ratings}
                    url={product.images[0].url}
                  />
                ))}
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
