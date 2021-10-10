import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Header />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/product/:id">
        <ProductDetails />
      </Route>
      <Footer />
    </Fragment>
  );
}

export default App;
