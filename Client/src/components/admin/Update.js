import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    decs: "",
    price: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState({});

  const location = useLocation();
  const bookId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing book data and populate the form
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/books/${bookId}`);
        setBook(response.data);
      } catch (err) {
        setError("Failed to fetch book data. Please try again later.");
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({});

    // Validate the form fields before updating the book
    const newErrors = {};
    if (!book.title) {
      newErrors.title = "Vui lòng điền tiêu đề sản phẩm.";
    }
    if (!book.decs) {
      newErrors.decs = "Vui lòng điền mô tả sản phẩm.";
    }
    if (!book.price) {
      newErrors.price = "Vui lòng điền giá sản phẩm.";
    } else if (isNaN(book.price) || Number(book.price) <= 0) {
      newErrors.price = "Giá sản phẩm phải là một số dương.";
    }
    const imagePattern = /\.(jpeg|jpg|png|gif)$/i;
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/i;
    if (!book.image) {
      newErrors.image = "Vui lòng điền đường dẫn ảnh minh họa sản phẩm.";
    } else if (!imagePattern.test(book.image) && !urlPattern.test(book.image)) {
      newErrors.image = "Vui lòng nhập đúng định dạng ảnh hoặc URL hợp lệ.";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      setIsLoading(false);
      navigate("/admin/dashboard");
    } catch (err) {
      setIsLoading(false);
      setError("Failed to update the book. Please try again later.");
    }
  };

  return (
    <div className="form">
      <h1>Cập nhật sản phẩm</h1>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        placeholder="Tiêu đề"
        value={book.title}
      />
      {errors.title && <p className="error-message">{errors.title}</p>}

      <input
        type="text"
        name="decs"
        onChange={handleChange}
        placeholder="Mô tả"
        value={book.decs}
      />
      {errors.decs && <p className="error-message">{errors.decs}</p>}

      <input
        type="text"
        name="price"
        onChange={handleChange}
        placeholder="Giá"
        value={book.price}
      />
      {errors.price && <p className="error-message">{errors.price}</p>}

      <input
        type="text"
        name="image"
        onChange={handleChange}
        placeholder="Ảnh minh họa"
        value={book.image}
      />
      {errors.image && <p className="error-message">{errors.image}</p>}

      <button className="formbutton" onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Đang cập nhật..." : "Cập nhật"}
      </button>
    </div>
  );
};

export default Update;
