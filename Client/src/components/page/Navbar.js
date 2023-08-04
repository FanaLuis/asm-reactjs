import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null); // Thêm state để lưu thông tin người dùng đã đăng nhập
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa (có access_token trong localStorage)
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      // Nếu đã đăng nhập, gọi API để lấy thông tin người dùng dựa vào access_token
      axios
        .get("http://localhost:8800/users/info", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user info:", error);
          localStorage.removeItem("access_token");
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    // Xóa access_token khỏi localStorage khi người dùng logout
    localStorage.removeItem("access_token");

    // Xóa thông tin người dùng khỏi state
    setUser(null);

    // Tải lại trang
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <img
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Icon-Truong-Dai-Hoc-Y-Duoc-Buon-Ma-Thuot-BMTU.png"
            alt="logo.png"
            style={{ width: "50px" }}
          />
        </Link>
        <ul className="nav-Links">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/product">
            <li>Product</li>
          </Link>
          {user ? (
            // Nếu có thông tin người dùng (đã đăng nhập), hiển thị tên người dùng và nút logout
            <>
              <li>{user.username}</li>
              <li onClick={handleLogout}>Logout</li>
            </>
          ) : (
            // Ngược lại, hiển thị nút đăng nhập và đăng kí
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
