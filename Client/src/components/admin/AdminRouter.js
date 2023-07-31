import React from "react";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Add from "./Add";
import Update from "./Update";

const AdminRouter = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Route cho trang Dashboard của admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Route cho trang Add của admin */}
        <Route path="/add" element={<Add />} />
        {/* Route cho trang Update của admin */}
        <Route path="update/:id" element={<Update />} />
      </Routes>
    </>
  );
};

export default AdminRouter;
