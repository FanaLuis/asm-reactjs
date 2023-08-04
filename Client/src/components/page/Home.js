import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Home = () => {
  const [book, setBook] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllBook = async (page) => {
    try {
      const res = await axios.get(`http://localhost:8800/books?page=${page}`);
      setBook(res.data.data);
      setTotalPages(res.data.totalPages);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
      <h1 className="home-title">Sản Phẩm mới</h1>
      <hr />
      <div className="books">
          {book.map((book) => (
            <Link to={`/productDetail/${book.id}`} className="book" key={book.id}>
              <div className="home-book">
                {book.image && <img src={book.image} alt="" />}
              </div>
              <div className="book-title">
                {book.title}
              </div>
              <p className="price">{book.price}</p>
              {/* <p>{book.decs}</p> */}
            </Link>
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
    </div>
  );
};

export default Home;
