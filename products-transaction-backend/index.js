const express = require("express");
const cors = require("cors");
const mongooseConnect = require("./config/mongooseConnect");
const productRouter = require("./routes/products.routes");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();
const allowedOrigins = [
  "https://products-transaction-statistics-frontend.vercel.app",
  "https://products-transaction-statistics-backend.vercel.app",
];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use("/", productRouter);

app.listen(PORT, async () => {
  await mongooseConnect();
  console.log(`http://localhost:${PORT}`);
});
