import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../CKeditorText";


const Add = () => {
  const [book, setBook] = useState({
    title: "",
    decs: "",
    price: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate the form fields before adding the book
    if (!book.title) {
      setError({ field: "title", message: "Vui lòng nhập tiêu đề sản phẩm." });
      return;
    }
    if (!book.decs) {
      setError({ field: "decs", message: "Vui lòng nhập mô tả sản phẩm." });
      return;
    }
    if (!book.price) {
      setError({ field: "price", message: "Vui lòng nhập giá sản phẩm." });
      return;
    }
    if (!book.image) {
      setError({
        field: "image",
        message: "Vui lòng nhập đường dẫn ảnh minh họa sản phẩm.",
      });
      return;
    }

    // Validate the price field as a positive number
    const priceValue = parseFloat(book.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError({
        field: "price",
        message: "Vui lòng nhập giá sản phẩm là một số dương.",
      });
      return;
    }

    // Validate the image field as either a valid image file or a valid URL
    const imagePattern = /\.(jpeg|jpg|png|gif)$/i;
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/i;

    if (!imagePattern.test(book.image) && !urlPattern.test(book.image)) {
      setError({
        field: "image",
        message: "Vui lòng nhập đúng định dạng ảnh hoặc URL hợp lệ.",
      });
      return;
    }

    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/admin");
    } catch (err) {
      setError({
        field: "form",
        message: "Lỗi khi thêm sản phẩm. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <>
      <form className="form">
        <h1>Thêm sản phẩm</h1>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Tiêu đề"
          value={book.title}
          style={{ whiteSpace: "nowrap" }}
        />
        {error && error.field === "title" && (
          <p className="error-message">{error.message}</p>
        )}

        <RichTextEditor
          value={book.decs}
          onChange={(data) => setBook((prev) => ({ ...prev, decs: data }))}
        />
        {error && error.field === "decs" && (
          <p className="error-message">{error.message}</p>
        )}

        <input
          type="text"
          name="price"
          onChange={handleChange}
          placeholder="Giá"
          value={book.price}
        />
        {error && error.field === "price" && (
          <p className="error-message">{error.message}</p>
        )}

        <input
          type="text"
          name="image"
          onChange={handleChange}
          placeholder="Ảnh minh họa"
          value={book.image}
        />
        {error && error.field === "image" && (
          <p className="error-message">{error.message}</p>
        )}

        <button className="formbutton" onClick={handleClick}>
          Thêm
        </button>
      </form>
    </>
  );
};

export default Add;
