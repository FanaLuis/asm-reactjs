import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Thêm state để kiểm tra quyền admin
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      axios
        .get("http://localhost:8800/users/info", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          // Kiểm tra xem user có quyền admin hay không
          if (response.data.role === "admin") {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user info:", error);
          setIsAdmin(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to={isAdmin ? "/admin" : "/"}>
          <img
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Icon-Truong-Dai-Hoc-Y-Duoc-Buon-Ma-Thuot-BMTU.png"
            alt=""
            style={{ width: "50px" }}
          />
        </Link>
        <ul className="nav-Links">
          {isAdmin ? (
            <>
              <Link to="/admin">
                <li>Dashboard</li>
              </Link>
              <Link to="/admin/add">
                <li>Thêm Sản Phẩm</li>
              </Link>
              
              <li onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <>
              <Link to="/login">
                <li>Đăng Nhập</li>
              </Link>
              <Link to="/register">
                <li>Đăng kí</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
