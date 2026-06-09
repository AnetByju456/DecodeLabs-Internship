const express = require("express");
const router = express.Router();
const connection = require("../config/db");


// GET all cart items
router.get("/", (req, res) => {
  const query = `
    SELECT
      cart_items.*,
      products.name AS product_name
    FROM cart_items
    JOIN products
    ON cart_items.product_id = products.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.status(200).json(results);
  });
});


// GET cart item by id
router.get("/:id", (req, res) => {
  const itemId = req.params.id;

  const query = `
    SELECT *
    FROM cart_items
    WHERE id = ?
  `;

  connection.query(query, [itemId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    res.status(200).json(results[0]);
  });
});


// ADD item to cart
router.post("/", (req, res) => {
  const {
    cart_id,
    product_id,
    quantity
  } = req.body;

  if (!cart_id || !product_id) {
    return res.status(400).json({
      message: "Required fields missing"
    });
  }

  const query = `
    INSERT INTO cart_items
    (cart_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  connection.query(
    query,
    [
      cart_id,
      product_id,
      quantity || 1
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      res.status(201).json({
        message: "Cart item added successfully",
        itemId: result.insertId
      });
    }
  );
});


// UPDATE quantity
router.put("/:id", (req, res) => {
  const itemId = req.params.id;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({
      message: "Quantity is required"
    });
  }

  const query = `
    UPDATE cart_items
    SET quantity = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [quantity, itemId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Cart item not found"
        });
      }

      res.status(200).json({
        message: "Cart item updated successfully"
      });
    }
  );
});


// DELETE cart item
router.delete("/:id", (req, res) => {
  const itemId = req.params.id;

  const query = `
    DELETE FROM cart_items
    WHERE id = ?
  `;

  connection.query(query, [itemId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    res.status(200).json({
      message: "Cart item deleted successfully"
    });
  });
});

module.exports = router;