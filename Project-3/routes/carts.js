const express = require("express");
const router = express.Router();
const connection = require("../config/db");


// GET all carts
router.get("/", (req, res) => {
  const query = `
    SELECT
      carts.*,
      users.name AS user_name
    FROM carts
    JOIN users
    ON carts.user_id = users.id
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


// GET cart by id
router.get("/:id", (req, res) => {
  const cartId = req.params.id;

  const query = `
    SELECT *
    FROM carts
    WHERE id = ?
  `;

  connection.query(query, [cartId], (err, results) => {
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
  });
});


// CREATE cart
router.post("/", (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({
      message: "User ID is required"
    });
  }

  const query = `
    INSERT INTO carts (user_id)
    VALUES (?)
  `;

  connection.query(query, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.status(201).json({
      message: "Cart created successfully",
      cartId: result.insertId
    });
  });
});


// UPDATE cart
router.put("/:id", (req, res) => {
  const cartId = req.params.id;
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({
      message: "User ID is required"
    });
  }

  const query = `
    UPDATE carts
    SET user_id = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [user_id, cartId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Cart not found"
        });
      }

      res.status(200).json({
        message: "Cart updated successfully"
      });
    }
  );
});


// DELETE cart
router.delete("/:id", (req, res) => {
  const cartId = req.params.id;

  const query = `
    DELETE FROM carts
    WHERE id = ?
  `;

  connection.query(query, [cartId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    res.status(200).json({
      message: "Cart deleted successfully"
    });
  });
});

module.exports = router;