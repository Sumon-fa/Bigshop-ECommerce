import React, { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { userLoad } from "./store/action/auth-Actions";
import "./App.css";
import store from "./store/store";
import Profile from "./components/authentication/Profile";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import UpdateProfile from "./components/authentication/UpdateProfile";
import UpdatePassword from "./components/authentication/UpdatePassword";
import ForgotPassword from "./components/authentication/ForgotPassword";
import NewPassword from "./components/authentication/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(userLoad());
    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);
  return (
    <Fragment>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search/:keyword">
            <Home />
          </Route>
          <Route path="/product/:id">
            <ProductDetails />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoutes path="/me" component={Profile} exact />
          <ProtectedRoutes path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoutes path="/shipping" component={Shipping} />
          <ProtectedRoutes path="/confirm" component={ConfirmOrder} />
          <ProtectedRoutes path="/success" component={OrderSuccess} />
          <ProtectedRoutes path="/orders/me" component={ListOrders} exact />
          <ProtectedRoutes path="/order/:id" component={OrderDetails} />

          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoutes path="/payment" component={Payment} />
            </Elements>
          )}
          <ProtectedRoutes
            path="/password/update"
            component={UpdatePassword}
            exact
          />
          <Route path="/password/forgot" exact>
            <ForgotPassword />
          </Route>
          <Route path="/password/reset/:token" exact>
            <NewPassword />
          </Route>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
