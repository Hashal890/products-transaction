const { default: axios } = require("axios");
const ProductModel = require("../models/products.model");

const initializeProducts = (req, res) => {
  try {
    axios
      .get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
      .then((response) => {
        ProductModel.insertMany(response.data);
        res.status(200).json({
          success: "Data inserted successfully!",
        });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    let { search = "", page = 1, perPage = 10 } = req.query;
    page = Number(page);
    perPage = Number(perPage);
    const searchQuery = {
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        Number(search) ? { price: Number(search) } : {},
      ],
    };
    const options = {
      page: page,
      limit: perPage,
      customLabels: {
        docs: "transactions",
        totalDocs: "total",
        totalPages: "totalPages",
      },
    };
    const result = await ProductModel.paginate(searchQuery, options);
    res.json({
      transactions: result.transactions,
      total: result.total,
      page: result.page,
      perPage: result.limit,
      totalPages: result.totalPages,
    });
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};

module.exports = { initializeProducts, getTransactions };
