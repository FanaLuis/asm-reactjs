import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import { FaBars } from "react-icons/fa";
// import { ImCross } from "react-icons/im";
const Navbar = () => {
//   const [Mobile, setMobile] = useState(true);
  return (
    <nav className="navbar">
      <div className="container">
      <Link to="/">
        <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Icon-Truong-Dai-Hoc-Y-Duoc-Buon-Ma-Thuot-BMTU.png" alt="logo.png"  Style="width: 50px;"/>
      </Link>
        <ul className="nav-Links">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/product">
            <li>Product</li>
          </Link>
          <Link to="/login">
            <li>Đăng Nhập</li>
          </Link>
          <Link to="/register">
            <li>Đăng kí</li>
          </Link>
        </ul>
        <button className="mobile-menu-icon">
          {/* {Mobile ? <ImCross /> : <FaBars />} */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
