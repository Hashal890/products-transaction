const express = require("express");
const {
  initializeProductTransactionCollection,
} = require("../controller/products.controller");

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});
productRouter.get("/initialize", initializeProductTransactionCollection);

module.exports = productRouter;
