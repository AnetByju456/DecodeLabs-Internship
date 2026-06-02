const express = require("express");
const router = express.Router();

const products = require("../data/products");

// GET all products
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// GET single product by ID
router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.status(200).json(product);
});


// POST new product
router.post("/", (req, res) => {
  const { name, category, price, type } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    category,
    price,
    type
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct
  });
});

module.exports = router;