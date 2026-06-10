const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER USER
router.post("/register", async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Required fields missing"
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

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
        hashedPassword,
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
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
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
    "SELECT * FROM users WHERE email = ?";

  connection.query(
    query,
    [email],
    async (err, results) => {
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

      const user = results[0];

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid credentials"
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
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


// DELETE USER
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  const query = "DELETE FROM users WHERE id = ?";

  connection.query(query, [userId], (err, result) => {
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
      message: "User deleted successfully"
    });
  });
});


// USER PRODUCTS
router.get("/:id/products", (req, res) => {
  const userId = req.params.id;

  connection.query(
    "SELECT * FROM products WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      res.status(200).json(results);
    }
  );
});


// USER ORDERS
router.get("/:id/orders", (req, res) => {
  const userId = req.params.id;

  connection.query(
    "SELECT * FROM orders WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      res.status(200).json(results);
    }
  );
});


// USER CART
router.get("/:id/cart", (req, res) => {
  const userId = req.params.id;

  connection.query(
    "SELECT * FROM carts WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Cart not found"
        });
      }

      res.status(200).json(results[0]);
    }
  );
});

module.exports = router;