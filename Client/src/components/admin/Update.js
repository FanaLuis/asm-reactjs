import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    decs: "",
    price: null,
    image: "",
  });
  const location = useLocation();
  const bookId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>Cập nhật sản phẩm</h1>
      <input
        type="text"
        name="title"
        id=""
        onChange={handleChange}
        placeholder="Tiêu đề"
        value={book.title || ""} // Use an empty string if book.title is null
      />
      <input
        type="text"
        name="decs"
        id=""
        onChange={handleChange}
        placeholder="Mô tả"
        value={book.decs || ""} // Use an empty string if book.decs is null
      />
      <input
        type="number"
        name="price"
        id=""
        onChange={handleChange}
        placeholder="Giá"
        value={book.price !== null ? book.price : ""} // Use an empty string if book.price is null
      />
      <input
        type="text"
        name="image"
        id=""
        onChange={handleChange}
        placeholder="Ảnh minh họa"
        value={book.image || ""} // Use an empty string if book.image is null
      />
      <button className="formbutton" onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
