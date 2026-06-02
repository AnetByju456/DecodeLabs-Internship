const express = require("express");
const router = express.Router();

const products = require("../data/products");

router.get("/", (req, res) => {
  res.status(200).json(products);
});

module.exports = router;