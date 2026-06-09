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

module.exports = router;