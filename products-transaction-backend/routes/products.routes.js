const express = require("express");
const {
  initializeProducts,
  getTransactions,
  getAllThreeApiResponses,
} = require("../controller/products.controller");

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});
productRouter.get("/initialize-products-collection-data", initializeProducts);
productRouter.get("/transactions", getTransactions);
productRouter.get("/get-all-three-api", getAllThreeApiResponses);

module.exports = productRouter;
