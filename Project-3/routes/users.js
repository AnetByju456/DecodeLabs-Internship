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

// GET USER BY ID
router.get("/:id", (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT id, name, email, phone, role, created_at
    FROM users
    WHERE id = ?
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(results[0]);
  });
});


// UPDATE USER
router.put("/:id", (req, res) => {
  const userId = req.params.id;

  const { name, email, phone, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  const query = `
    UPDATE users
    SET name = ?, email = ?, phone = ?, role = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [name, email, phone, role, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "User updated successfully"
      });
    }
  );
});

//DELETE USER
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  const query = "DELETE FROM users WHERE id = ?";

  connection.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  });
});

module.exports = router;