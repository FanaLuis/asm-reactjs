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
      <Link to="/admin/dashboard">
        <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Icon-Truong-Dai-Hoc-Y-Duoc-Buon-Ma-Thuot-BMTU.png" alt=""  Style="width: 50px;margin-left: 30px;margin-top: 8px;"/>
      </Link>
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
