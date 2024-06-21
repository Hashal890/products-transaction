const { default: axios } = require("axios");
const ProductsModel = require("../models/products.model");

const initializeProductTransactionCollection = (req, res) => {
  try {
    axios
      .get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
      .then((res) => {
        ProductsModel.insertMany(res.data);
        res.status(200).send("Data inserted successfully!");
      })
      .catch((err) => res.status(404).send(err));
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { initializeProductTransactionCollection };
