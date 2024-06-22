const express = require("express");
const {
  initializeProducts,
  getTransactions,
  getAllThreeApiResponses,
} = require("../controller/products.controller");

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my products transactions backend deployment!",
  });
});
productRouter.get("/initialize-products-collection-data", initializeProducts);
productRouter.get("/transactions", getTransactions);
productRouter.get("/get-all-three-api", getAllThreeApiResponses);

module.exports = productRouter;
