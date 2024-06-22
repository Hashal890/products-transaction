const express = require("express");
const cors = require("cors");
const mongooseConnect = require("./config/mongooseConnect");
const productRouter = require("./routes/products.routes");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", productRouter);

app.listen(PORT, async () => {
  await mongooseConnect();
  console.log(`http://localhost:${PORT}`);
});
