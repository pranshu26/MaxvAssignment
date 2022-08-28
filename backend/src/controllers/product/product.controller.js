const { uniqueId, successResponse, errorResponse } = require("../../helpers");
const { product_model } = require("../../models");
exports.create = async (req, res) => {
  try {
    let body = req.body;

    body.productId = uniqueId();
    body.campaignId = req.query.campaignId;
    let product = await product_model.create(body);
    return successResponse(req, res, { product });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    let campaignId = req.params.campaignId;
    let products = await product_model.findAll({
      where: {
        campaignId,
      },
    });
    products = products.map((obj) => obj.get());
    return successResponse(req, res, { products });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message);
  }
};
