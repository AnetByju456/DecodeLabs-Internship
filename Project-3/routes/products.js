const express = require("express");
const router = express.Router();
const connection = require("../config/db");


// GET all products
// GET all products with optional filters
router.get("/", (req, res) => {
  const { category, type } = req.query;

  let query = "SELECT * FROM products WHERE 1=1";
  let values = [];

  if (category) {
    query += " AND category = ?";
    values.push(category);
  }

  if (type) {
    query += " AND type = ?";
    values.push(type);
  }

  connection.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.status(200).json(results);
  });
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;

  const query = "SELECT * FROM products WHERE id = ?";

  connection.query(query, [productId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(results[0]);
  });
});



// CREATE product
router.post("/", (req, res) => {
  const {
    name,
    category,
    price,
    type,
    user_id
  } = req.body;

  if (
    !name ||
    !category ||
    !price ||
    !type ||
    !user_id
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const query = `
    INSERT INTO products
    (name, category, price, type, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      name,
      category,
      price,
      type,
      user_id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.status(201).json({
        message: "Product added successfully",
        productId: result.insertId,
      });
    }
  );
});

// UPDATE product
router.put("/:id", (req, res) => {
  const productId = req.params.id;

  const { name, category, price, type, user_id } = req.body;

  if (!name || !category || !price || !type || !user_id) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const query = `
    UPDATE products
    SET name = ?, category = ?, price = ?, type = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [name, category, price, type, productId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product updated successfully",
      });
    }
  );
});


// DELETE product
router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  const query = "DELETE FROM products WHERE id = ?";

  connection.query(query, [productId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  });
});

module.exports = router;