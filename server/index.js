import express from "express";
import { createConnection } from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import cache from "memory-cache";

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

app.listen(8800, () => {
  console.log("Server started on port 8800");
});
