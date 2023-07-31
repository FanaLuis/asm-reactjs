import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchAllBook = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBook();
  }, []);

  //hàm delete 
  const handleDelele = async (id) => {
    try{
        await axios.delete(`http://localhost:8800/books/${id}`);
        window.location.reload();
    }catch(err){
      console.log(err);
    }
  };
  return (
    <div className="app">
      <div>
        
        <h1>Book Shop</h1>
        <div>
          <button className="formAdd">
            <Link to="/admin/add">Thêm Sách</Link>
          </button>
        </div>
        <div className="books">
          {book.map((book) => (
            <div className="book" key={book.id}>
              {book.image && <img src={book.image} alt="" />}
              <h3>{book.title}</h3>
              <h3>{book.price}</h3>
              {/* <p>{book.decs}</p> */}
              <button className="delete" onClick={() => handleDelele(book.id)}>Delete</button>
              <button className="update"><Link to={`/admin/update/${book.id}`}>Update</Link></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
