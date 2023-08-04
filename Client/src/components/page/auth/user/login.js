import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    // Call the API to perform login
    axios
      .post("http://localhost:8800/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const { access_token,role } = response.data;
        console.log(role);

        // Save the access token to local storage or state management (e.g., Redux)
        localStorage.setItem("access_token", access_token);
        

        setUserRole(role);
        // Redirect to appropriate page based on user role
        if (role === 'admin') {
          navigate("/admin");
          window.location.reload();
        } else {
          navigate("/");
          window.location.reload();
        }
        
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Đã xảy ra lỗi khi đăng nhập.");
        }
      });
  };

  

  return (
    <>
      <section>
        <div className="signin">
          <div className="content">
            <h2>Đăng Nhập</h2>
            <div className="form">
              <div className="inputBox">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="error">{error}</div>}
              <div className="links">
                <Link to={`/login`}> Quên Mật Khẩu</Link>
                <Link to={`/register`}> Đăng Kí </Link>
              </div>
              <div className="inputBox">
                <button type="submit" onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
