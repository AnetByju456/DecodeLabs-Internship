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


// ADD ITEM TO CART
router.post("/items", (req, res) => {
  const { cart_id, product_id, quantity } = req.body;

  if (!cart_id || !product_id) {
    return res.status(400).json({
      message: "cart_id and product_id are required"
    });
  }

  const query = `
    INSERT INTO cart_items
    (cart_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  connection.query(
    query,
    [cart_id, product_id, quantity || 1],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      res.status(201).json({
        message: "Item added to cart",
        cartItemId: result.insertId
      });
    }
  );
});


// VIEW CART ITEMS
router.get("/items/:cartId", (req, res) => {
  const cartId = req.params.cartId;

  const query = `
    SELECT
      cart_items.id,
      cart_items.quantity,
      products.name,
      products.price,
      products.category
    FROM cart_items
    JOIN products
    ON cart_items.product_id = products.id
    WHERE cart_items.cart_id = ?
  `;

  connection.query(query, [cartId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.status(200).json(results);
  });
});


// UPDATE CART ITEM QUANTITY
router.put("/items/:cartItemId", (req, res) => {
  const cartItemId = req.params.cartItemId;
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
    [quantity, cartItemId],
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


// REMOVE CART ITEM
router.delete("/items/:cartItemId", (req, res) => {
  const cartItemId = req.params.cartItemId;

  const query = `
    DELETE FROM cart_items
    WHERE id = ?
  `;

  connection.query(query, [cartItemId], (err, result) => {
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
      message: "Cart item removed successfully"
    });
  });
});


// CLEAR CART
router.delete("/clear/:cartId", (req, res) => {
  const cartId = req.params.cartId;

  const query = `
    DELETE FROM cart_items
    WHERE cart_id = ?
  `;

  connection.query(query, [cartId], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.status(200).json({
      message: "Cart cleared successfully"
    });
  });
});

module.exports = router;