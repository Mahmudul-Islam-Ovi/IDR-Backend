const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5000;

const db = new sqlite3.Database(
  "./db/dua_main.sqlite",
  sqlite3.OPEN_READONLY,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the database");
    }
  }
);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM category";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    }
    res.json(rows);
  });
});
app.get("/subcategories", (req, res) => {
  const sql = "SELECT * FROM sub_category";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    }
    res.json(rows);
  });
});
app.get("/duas", (req, res) => {
  const sql = "SELECT * FROM dua";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
