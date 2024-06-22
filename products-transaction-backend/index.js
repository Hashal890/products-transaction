const express = require("express");
const cors = require("cors");
const mongooseConnect = require("./config/mongooseConnect");
const productRouter = require("./routes/products.routes");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();
// const allowedOrigins = [
//   "https://products-transaction-statistics-frontend.vercel.app",
//   "https://products-transaction-statistics-backend.vercel.app",
// ];

app.use(express.json());
app.use(
  cors({
    origin: "https://products-transaction-statistics-frontend.vercel.app",
    methods: ["GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/", productRouter);

app.listen(PORT, async () => {
  await mongooseConnect();
  console.log(`http://localhost:${PORT}`);
});
