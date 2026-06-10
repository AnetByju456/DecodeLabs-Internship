const express = require("express");
const router = express.Router();

const carts = require("../data/carts");
const cartItems = require("../data/cartItems");
const products = require("../data/products");

// GET cart by userId (FULL CART VIEW)
router.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  const cart = carts.find((c) => c.userId === userId);

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const items = cartItems.filter((item) => item.cartId === cart.id);

  const detailedItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    return {
      ...item,
      product,
      total: product ? product.price * item.quantity : 0,
    };
  });

  const cartTotal = detailedItems.reduce((sum, i) => sum + i.total, 0);

  res.json({
    cart,
    items: detailedItems,
    cartTotal,
  });
});


// ADD ITEM TO CART
router.post("/add", (req, res) => {
  const { userId, productId, quantity } = req.body;

  const cart = carts.find((c) => c.userId === userId);

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingItem = cartItems.find(
    (i) => i.cartId === cart.id && i.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    return res.json({
      message: "Cart item quantity updated",
      item: existingItem,
    });
  }

  const newItem = {
    id: cartItems.length + 1,
    cartId: cart.id,
    productId,
    quantity,
  };

  cartItems.push(newItem);

  res.status(201).json({
    message: "Item added to cart",
    item: newItem,
  });
});


// UPDATE QUANTITY
router.put("/item/:id", (req, res) => {
  const item = cartItems.find((i) => i.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  const { quantity } = req.body;

  if (quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than 0" });
  }

  item.quantity = quantity;

  res.json({
    message: "Quantity updated",
    item,
  });
});


// REMOVE ITEM
router.delete("/item/:id", (req, res) => {
  const index = cartItems.findIndex(
    (i) => i.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  const removed = cartItems.splice(index, 1);

  res.json({
    message: "Item removed from cart",
    item: removed[0],
  });
});


// CLEAR CART (DELETE ALL ITEMS FOR USER)
router.delete("/clear/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  const cart = carts.find((c) => c.userId === userId);

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  for (let i = cartItems.length - 1; i >= 0; i--) {
    if (cartItems[i].cartId === cart.id) {
      cartItems.splice(i, 1);
    }
  }

  res.json({
    message: "Cart cleared successfully",
  });
});

module.exports = router;