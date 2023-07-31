import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Product from "./Product";
import Services from "./Services";
import Contact from "./Contact";
import ProductDetail from "./ProductDetail";

const HomeRouter = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productDetail/:productId" element={<ProductDetail />} /> {/* Add the route for product detail */}
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default HomeRouter;
