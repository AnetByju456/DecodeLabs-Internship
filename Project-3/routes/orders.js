const express = require("express");
const router = express.Router();
const connection = require("../config/db");


// GET all orders
router.get("/", (req, res) => {
  const query = `
    SELECT
      orders.*,
      users.name AS user_name
    FROM orders
    JOIN users
    ON orders.user_id = users.id
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


// GET single order
router.get("/:id", (req, res) => {
  const orderId = req.params.id;

  const query = `
    SELECT *
    FROM orders
    WHERE id = ?
  `;

  connection.query(query, [orderId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(results[0]);
  });
});


// CREATE order
router.post("/", (req, res) => {
  const { user_id, total_amount, status } = req.body;

  if (!user_id || !total_amount) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  const query = `
    INSERT INTO orders
    (user_id, total_amount, status)
    VALUES (?, ?, ?)
  `;

  connection.query(
    query,
    [
      user_id,
      total_amount,
      status || "pending",
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.status(201).json({
        message: "Order created successfully",
        orderId: result.insertId,
      });
    }
  );
});


// UPDATE order status
router.put("/:id", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Status is required",
    });
  }

  const query = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [status, orderId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.status(200).json({
        message: "Order updated successfully",
      });
    }
  );
});


// DELETE order
router.delete("/:id", (req, res) => {
  const orderId = req.params.id;

  const query = `
    DELETE FROM orders
    WHERE id = ?
  `;

  connection.query(query, [orderId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  });
});

module.exports = router;