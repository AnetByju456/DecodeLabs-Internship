const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

const productsRoute = require("./routes/products");

app.get("/", (req, res) => {
  res.send("TradeMart Backend API is running!");
});

app.use("/products", productsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});