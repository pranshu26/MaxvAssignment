const express = require("express");
const validate = require("express-validation");
const { create, getAll } = require("../controllers/product/product.controller");
const validator = require("../controllers/product/product.validator");

const router = express.Router();

const apiAuth = require("../middleware/apiAuth");

router.use(apiAuth);
router.post("/", validate(validator.create), create);

router.get("/:campaignId", validate(validator.getAll), getAll);

module.exports = router;
