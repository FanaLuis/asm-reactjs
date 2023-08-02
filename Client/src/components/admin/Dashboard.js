import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(books);

  useEffect(() => {
    const fetchBooksByPage = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books?page=${currentPage}`);
        setBooks(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
      }
    };
    fetchBooksByPage();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDelete = async (id) => {
    // Xác nhận trước khi xóa
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa cuốn sách này?");
  
    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:8800/books/${id}`);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      } catch (err) {
        setError("Failed to delete the book. Please try again later.");
      }
    } else {
      // Người dùng đã hủy bỏ xóa sách
      // Bạn có thể thực hiện các hành động khác ở đây nếu cần thiết
    }
  };
  

  return (
    <div className="app">
      <div>
        {/* <h1>Book Shop</h1> */}
        <div>
          <button className="formAdd">
            <Link to="/admin/add">Thêm Sách</Link>
          </button>
        </div>
        <div className="books">
          {books.map((book) => (
            <div className="book" key={book.id}>
              {book.image && <img src={book.image} alt="" />}
              <h3>{book.title}</h3>
              {/* <h3>{book.price}</h3> */}
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/admin/update/${book.id}`}>Update</Link>
              </button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <AiOutlineArrowLeft />
          </button>
          <p>{currentPage}</p>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <AiOutlineArrowRight />
          </button>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
