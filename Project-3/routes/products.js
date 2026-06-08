const express = require("express");
const router = express.Router();
const connection = require("../config/db");


// GET all products
router.get("/", (req, res) => {
  const query = "SELECT * FROM products";

  connection.query(query, (err, results) => {
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
  const { name, category, price, type } = req.body;

  if (!name || !category || !price || !type) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const query =
    "INSERT INTO products (name, category, price, type) VALUES (?, ?, ?, ?)";

  connection.query(
    query,
    [name, category, price, type],
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

// UPDATE product by ID
router.put("/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const { name, category, price, type } = req.body;

  if (!name || !category || !price || !type) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  product.name = name;
  product.category = category;
  product.price = price;
  product.type = type;

  res.status(200).json({
    message: "Product updated successfully",
    product
  });
});


// DELETE product by ID
router.delete("/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex(
    (item) => item.id === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products.splice(productIndex, 1);

  res.status(200).json({
    message: "Product deleted successfully"
  });
});

module.exports = router;