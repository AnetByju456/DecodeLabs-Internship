const express = require("express");
const router = express.Router();

const users = require("../data/users");
const carts = require("../data/carts");
const cartItems = require("../data/cartItems");
const orders = require("../data/orders");
const orderItems = require("../data/orderItems");
const products = require("../data/products");
const activityLogs = require("../data/activityLogs");


// GET DASHBOARD DATA
router.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  // 1. USER
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 2. CART
  const cart = carts.find((c) => c.userId === userId);

  let cartSummary = {
    items: [],
    total: 0,
  };

  if (cart) {
    const items = cartItems.filter((i) => i.cartId === cart.id);

    const detailedItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      return {
        ...item,
        product,
        total: product ? product.price * item.quantity : 0,
      };
    });

    const total = detailedItems.reduce((sum, i) => sum + i.total, 0);

    cartSummary = {
      items: detailedItems,
      total,
    };
  }

  // 3. ORDERS
  const userOrders = orders
    .filter((o) => o.userId === userId)
    .map((order) => {
      const items = orderItems.filter((i) => i.orderId === order.id);

      const detailedItems = items.map((item) => {
        const product = products.find((p) => p.id === item.productId);

        return {
          ...item,
          product,
        };
      });

      return {
        ...order,
        items: detailedItems,
      };
    });

  // 4. ACTIVITY (latest 10)
  const activities = activityLogs
    .filter((a) => a.userId === userId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);

  // 5. STATS
  const totalOrders = userOrders.length;

  const totalSpent = userOrders.reduce((sum, order) => {
    return sum + (order.totalAmount || 0);
  }, 0);

  const cartCount = cartSummary.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // FINAL RESPONSE
  res.json({
    user,
    cart: cartSummary,
    orders: userOrders,
    activity: activities,
    stats: {
      totalOrders,
      totalSpent,
      cartCount,
    },
  });
});

module.exports = router;