const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

productsSchema.plugin(mongoosePaginate);

const ProductsModel = mongoose.model("producttransactions", productsSchema);

module.exports = ProductsModel;
