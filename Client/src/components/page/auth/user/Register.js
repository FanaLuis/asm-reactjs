import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!username || !email || !password) {
      setError("Vui lòng nhập tên đăng nhập, email và mật khẩu.");
      return;
    }

    // Clear any previous errors
    setError("");
    setSuccessMessage("");

    // Call the API to register user
    axios
      .post("http://localhost:8800/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Đã xảy ra lỗi khi đăng ký.");
        }
      });
  };

  return (
    <>
      <section>
        <div className="signin">
          <div className="content">
            <h2>Đăng Kí</h2>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input
                    type="text"
                    required
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />{" "}
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    required
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />{" "}
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />{" "}
                </div>
                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}
                <div className="links">
                  {" "}
                  <Link to={`/login`}> Quên Mật Khẩu</Link>
                  <Link to={`/login`}> Đăng Nhập </Link>
                </div>
                <div className="inputBox">
                  <input type="submit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
