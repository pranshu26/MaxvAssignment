const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const publicRoutes = require("./src/routes/public");
const userRoutes = require("./src/routes/user");
const apiMiddleware = require("./src/middleware/apiAuth");
const errorHandler = require("./src/middleware/errorHandler");
const campaignRoutes = require("./src/routes/campaign");
const productRoutes = require("./src/routes/product");

dotenv.config();
require("./src/config/sequelize");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/pub", publicRoutes);
app.use("/user", apiMiddleware, userRoutes);
app.use("/campaign", campaignRoutes);
app.use("/product", productRoutes);

app.use(errorHandler);

module.exports = app;
