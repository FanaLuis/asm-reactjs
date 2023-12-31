import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import Login from "./auth/user/login";
import Register from "./auth/user/Register";

const HomeRouter = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productDetail/:productId" element={<ProductDetail />} /> {/* Add the route for product detail */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default HomeRouter;
