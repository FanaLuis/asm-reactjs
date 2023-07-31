import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [book, setBook] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllBook = async (page) => {
    try {
      const res = await axios.get(`http://localhost:8800/books?page=${page}`);
      setBook(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(book);

  useEffect(() => {
    fetchAllBook(currentPage);
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

  return (
    <div className="app">
      <div className="books">
        {book.map((book) => (
          <div className="book" key={book.id}>
            <div className="home-book">
              {book.image && <img src={book.image} alt="" />}
            </div>
            <Link to={`/productDetail/${book.id}`} className="book-title">
              {book.title}
            </Link>
            <p className="price">{book.price}</p>
            {/* <p>{book.decs}</p> */}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <p>{currentPage}</p>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
