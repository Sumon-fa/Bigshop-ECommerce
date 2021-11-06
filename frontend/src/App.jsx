import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import "./App.css";

function App() {
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
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
