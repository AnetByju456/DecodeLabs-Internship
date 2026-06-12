const express = require("express");
const router = express.Router();
const connection = require("../config/db");


// GET all order items
router.get("/", (req, res) => {
  const query = `
    SELECT
      order_items.*,
      products.name AS product_name
    FROM order_items
    JOIN products
    ON order_items.product_id = products.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.status(200).json(results);
  });
});


// GET single order item
router.get("/:id", (req, res) => {
  const itemId = req.params.id;

  const query = `
    SELECT *
    FROM order_items
    WHERE id = ?
  `;

  connection.query(query, [itemId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    res.status(200).json(results[0]);
  });
});


// CREATE order item
router.post("/", (req, res) => {
  const {
    order_id,
    product_id,
    quantity,
    price
  } = req.body;

  if (
    !order_id ||
    !product_id ||
    !price
  ) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  const query = `
    INSERT INTO order_items
    (order_id, product_id, quantity, price)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      order_id,
      product_id,
      quantity || 1,
      price
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.status(201).json({
        message: "Order item added successfully",
        itemId: result.insertId,
      });
    }
  );
});


// UPDATE order item
router.put("/:id", (req, res) => {
  const itemId = req.params.id;

  const {
    quantity,
    price
  } = req.body;

  const query = `
    UPDATE order_items
    SET quantity = ?, price = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [quantity, price, itemId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Order item not found",
        });
      }

      res.status(200).json({
        message: "Order item updated successfully",
      });
    }
  );
});


// DELETE order item
router.delete("/:id", (req, res) => {
  const itemId = req.params.id;

  const query = `
    DELETE FROM order_items
    WHERE id = ?
  `;

  connection.query(query, [itemId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

      if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    res.status(200).json({
      message: "Order item deleted successfully",
    });
  });
});

module.exports = router;