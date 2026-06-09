const express = require("express");
require("./config/db");
const app = express();

app.use(express.json());

const PORT = 3000;

const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const ordersRoute = require("./routes/orders");
const orderItemsRoute = require("./routes/orderItems");
const cartsRoute = require("./routes/carts");
const cartItemsRoute = require("./routes/cartItems");
const activityRoute = require("./routes/activity");

app.get("/", (req, res) => {
  res.send("TradeMart Backend API is running!");
});

app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/orders", ordersRoute);
app.use("/order-items", orderItemsRoute);
app.use("/carts", cartsRoute);
app.use("/cart-items", cartItemsRoute);
app.use("/activity", activityRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});