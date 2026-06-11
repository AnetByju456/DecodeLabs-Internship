const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const authenticateToken = require("../middleware/auth");

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


// GET single product
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
router.post("/", authenticateToken, (req, res) => {
  const { name, category, price, type } = req.body;

  const user_id = req.user.id;

  if (!name || !category || !price || !type || !user_id) {
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
    [name, category, price, type, user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      connection.query(
        "INSERT INTO activity_logs (user_id, action) VALUES (?, ?)",
        [user_id, `Created product: ${name}`]
      );

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

  const { name, category, price, type } = req.body;

  if (!name || !category || !price || !type) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, productResults) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (productResults.length === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      const product = productResults[0];

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

          connection.query(
            "INSERT INTO activity_logs (user_id, action) VALUES (?, ?)",
            [product.user_id, `Updated product: ${name}`]
          );

          res.status(200).json({
            message: "Product updated successfully",
          });
        }
      );
    }
  );
});


// DELETE product
router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, productResults) => {
      if (err) {
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
          return res.status(400).json({
            message:
              "Cannot delete product because it is used in an order",
          });
        }

        return res.status(500).json({
          message: "Database error",
        });
      }

      if (productResults.length === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      const product = productResults[0];

      connection.query(
        "DELETE FROM products WHERE id = ?",
        [productId],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Database error",
            });
          }

          connection.query(
            "INSERT INTO activity_logs (user_id, action) VALUES (?, ?)",
            [product.user_id, `Deleted product: ${product.name}`]
          );

          res.status(200).json({
            message: "Product deleted successfully",
          });
        }
      );
    }
  );
});

module.exports = router;