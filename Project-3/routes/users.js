const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// REGISTER USER
router.post("/register", (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Required fields missing"
    });
  }

  const query = `
    INSERT INTO users
    (name, email, phone, password, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      name,
      email,
      phone,
      password,
      role || "buyer"
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      res.status(201).json({
        message: "User registered successfully",
        userId: result.insertId
      });
    }
  );
});


// LOGIN USER
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const query =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  connection.query(
    query,
    [email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid credentials"
        });
      }

      res.status(200).json({
        message: "Login successful",
        user: results[0]
      });
    }
  );
});

module.exports = router;