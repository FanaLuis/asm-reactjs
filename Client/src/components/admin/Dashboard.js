import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooksByPage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/books?page=${currentPage}`
        );
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
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa cuốn sách này?"
    );

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
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên Sản Phẩm</th>
            <th scope="col">Giá</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <th scope="row">{book.id}</th>
              <td>{book.title}</td>
              <td>{book.price}</td>
              <td>
                {
                  new DOMParser().parseFromString(book.decs, "text/html")
                    .documentElement.textContent
                }
              </td>

              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button className="update">
                  <Link to={`/admin/update/${book.id}`}>edit</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <AiOutlineArrowLeft /> Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
