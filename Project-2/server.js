const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

const productsRoute = require("./routes/products");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/carts");

app.get("/", (req, res) => {
  res.send("TradeMart Backend API is running!");
});

app.use("/products", productsRoute);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);

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