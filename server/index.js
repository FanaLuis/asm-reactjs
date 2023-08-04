import express from "express";
import { createConnection } from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import cache from "memory-cache";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const jwtSecretKey = "akq2312ksdaklsdajshdaasd12312qd";
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.get("/books", (req, res) => {
//   const q = "SELECT * FROM book";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

app.get("/books", (req, res) => {
  const { page } = req.query;
  const perPage = 3;
  const offset = (parseInt(page) - 1) * perPage;

  const q = "SELECT * FROM book ORDER BY currentstamp DESC LIMIT ? OFFSET ?";
  db.query(q, [perPage, offset], (err, data) => {
    if (err) return res.json(err);

    // Query to get the total count of books
    const countQuery = "SELECT COUNT(*) AS total FROM book";
    db.query(countQuery, (err, countData) => {
      if (err) return res.json(err);

      const total = countData[0].total;
      const totalPages = Math.ceil(total / perPage);

      return res.json({
        data: data,
        totalPages: totalPages,
      });
    });
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO book (`title`, `decs`, `price`, `image`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.decs,
    req.body.price,
    req.body.image,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book hass been added");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM book WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE book SET title = ?, decs = ?, price = ?, image = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.decs,
    req.body.price,
    req.body.image,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update book." });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found." });
    }

    return res.json("Book has been updated.");
  });
});

//trang chi tiết
// Trang chi tiết
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;

  // Kiểm tra xem dữ liệu đã được lưu trong cache chưa
  const cachedData = cache.get(bookId);
  if (cachedData) {
    console.log("Data from ccc");
    return res.json(cachedData);
  }

  const q = "SELECT * FROM book WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to get book details." });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Book not found." });
    }

    // Lưu kết quả truy vấn vào cache với thời gian sống 1 phút (60 giây)
    cache.put(bookId, data[0], 60000);
    console.log("Data from MySQL");
    return res.json(data[0]);
  });
});


app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch users.' });
    }

    return res.json(data);
  });
});



//////////////////////////////////////////////////////////////////////////////////////////////////////*css*/`
// phần user ///////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to login." });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = data[0];

    // Check the password using bcryptjs
    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr) {
        console.error(bcryptErr);
        return res.status(500).json({ error: "Failed to login." });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Login success - generate JWT
      const accessToken = generateAccessToken(user);

      // Save the access token in the database (or you can save it in the application state if you prefer)
      const updateTokenQuery = "UPDATE users SET access_token = ? WHERE user_id = ?";
      db.query(updateTokenQuery, [accessToken, user.user_id], (updateTokenErr) => {
        if (updateTokenErr) {
          console.error(updateTokenErr);
          return res.status(500).json({ error: "Failed to login." });
        }

        return res.json({ access_token: accessToken, role: user.role });
      });
    });
  });
});




// phần đăng kí

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  // Check if username or email already exists in the database
  const checkDuplicateQuery = "SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?";
  db.query(checkDuplicateQuery, [username, email], (err, result) => {
    if (err) {
      console.error("Error checking duplicate:", err);
      return res.status(500).json({ error: "Failed to register." });
    }

    const { count } = result[0];
    if (count > 0) {
      return res.status(409).json({ error: "Username or email already exists." });
    }

    // Hash password using bcrypt before saving to the database
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Error hashing password:", hashErr);
        return res.status(500).json({ error: "Failed to register." });
      }

      const role = "user"; // Default role for new users
      const accessToken = null; // Set access_token to null for new users

      // Insert user information into the database
      const insertUserQuery =
        "INSERT INTO users (`username`, `password`, `email`, `role`, `access_token`) VALUES (?, ?, ?, ?, ?)";
      db.query(insertUserQuery, [username, hashedPassword, email, role, accessToken], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting user:", insertErr);
          return res.status(500).json({ error: "Failed to register." });
        }

        return res.json({ message: "Registration successful!" });
      });
    });
  });
});

// Hàm tạo access token sử dụng JWT
function generateAccessToken(user) {
  return jwt.sign({ user_id: user.user_id, role: user.role }, "your_secret_key", {
    expiresIn: "1h", // Token will expire in 1 hour
  });
}

// Đoạn code sử dụng JWT để xác thực token và bảo vệ các tuyến đường cần xác thực
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      console.error("Failed to authenticate token:", err);
      return res.status(403).json({ error: "Forbidden." });
    }

    req.user = user;
    next();
  });
}

// Các tuyến đường cần xác thực token thì gọi hàm authenticateToken trước khi thực hiện xử lý
app.get("/protected-route", authenticateToken, (req, res) => {
  // Ở đây, user đã được xác thực thành công và có thể tiếp tục xử lý tuyến đường
  return res.json({ message: "Protected route accessed successfully!" });
});

app.get("/users/info", authenticateToken, (req, res) => {
  const user_id = req.user.user_id;

  const getUserInfoQuery = "SELECT user_id, username, email, role FROM users WHERE user_id = ?";
  db.query(getUserInfoQuery, [user_id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to get user info." });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const userInfo = data[0];
    return res.json(userInfo);
  });
});


app.listen(8800, () => {
  console.log("Server started on port 8800");
});