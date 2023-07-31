import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    decs: "",
    price: null,
    image: "",
  });
  const navigate = useNavigate(); // Điều chỉnh tên biến nagative thành navigate

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/admin/dashboard"); // Điều chỉnh nagative thành navigate
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>thêm sản phẩm</h1>
      <input
        type="text"
        name="title"
        id=""
        onChange={handleChange}
        placeholder="Tiêu đề"
      />
      <input
        type="text"
        name="decs"
        id=""
        onChange={handleChange}
        placeholder="Mô tả"
      />
      <input
        type="number"
        name="price"
        id=""
        onChange={handleChange}
        placeholder="Giá"
      />
      <input
        type="text"
        name="image"
        id=""
        onChange={handleChange}
        placeholder="Ảnh minh họa"
      />
      <button className="formbutton" onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
