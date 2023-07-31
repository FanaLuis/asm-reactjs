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
        <h3 className="logo">Logo</h3>
        <ul className="nav-Links">
          <Link to="/admin/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link to="/admin/add">
            <li>Thêm Sản Phẩm</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
