const express = require("express");
require("./config/db");
const app = express();

app.use(express.json());

const PORT = 3000;

const productsRoute = require("./routes/products");

app.get("/", (req, res) => {
  res.send("TradeMart Backend API is running!");
});

app.use("/products", productsRoute);

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