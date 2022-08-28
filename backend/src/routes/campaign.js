const express = require("express");
const validate = require("express-validation");
const validator = require("../controllers/campaign/campaign.validator");

const router = express.Router();
const {
  fetchAllCampaigns,
  fetchCampaign,
  create,
  updateCampaign,
  inactivateCampaign,
  assignInfluencer,
} = require("../controllers/campaign/campaign.controller");
const apiAuth = require("../middleware/apiAuth");
const { successResponse } = require("../helpers");
const { influencer } = require("../constants");

router.use(apiAuth);
router.get("/", fetchAllCampaigns);
router.get("/:campaignId", validate(validator.fetchCampaign), fetchCampaign);

router.post("/", validate(validator.create), create);

router.put("/:campaignId", validate(validator.fetchCampaign), updateCampaign);

router.put(
  "/delete/:campaignId",
  validate(validator.fetchCampaign),
  inactivateCampaign
);

router.post(
  "/:campaignId/influencer/",
  validate(validator.assignInfluencer),
  assignInfluencer
);

//ideally this should be in different route in influencer services

router.get("/:campaignId/influencer", (req, res) => {
  return successResponse(req, res, { influencer });
});

module.exports = router;
