import React, { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { userLoad } from "./store/action/auth-Actions";
import "./App.css";
import { useSelector } from "react-redux";
import store from "./store/store";
import Profile from "./components/authentication/Profile";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import UpdateProfile from "./components/authentication/UpdateProfile";
import UpdatePassword from "./components/authentication/UpdatePassword";
import ForgotPassword from "./components/authentication/ForgotPassword";
import NewPassword from "./components/authentication/NewPassword";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  useEffect(() => {
    store.dispatch(userLoad());
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
          <Route path="/product/:id" exact>
            <ProductDetails />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoutes path="/me" component={Profile} exact />
          <ProtectedRoutes path="/me/update" component={UpdateProfile} exact />
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
