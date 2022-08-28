const { CHANNELS, influencer } = require("../../constants");
const { successResponse, errorResponse, uniqueId } = require("../../helpers");
let { campaign_model, campaignInfluencer_model } = require("../../models");
const { attachChannels } = require("./campaign.helpers");

exports.fetchAllCampaigns = async (req, res) => {
  try {
    let companyId = req.user.companyId;

    let campaigns = await campaign_model.findAll({
      where: { companyId, isActive: 1 },
      attributes: ["name", "addedOn", "campaignChannels", "campaignId"],
      include: [
        {
          model: campaignInfluencer_model,
          as: "influencer",
        },
      ],
      order: [["addedOn", "DESC"]],
    });

    //ideally this piece of code should be a get request to influencer application

    campaigns.forEach(async (obj) => {
      obj = obj.get();
      obj.influencersArray = [];
      obj.channels = attachChannels(obj);
      obj.influencer.forEach((el) => {
        obj.influencersArray.push(
          influencer.find((o) => o.id == el.influencerId)
        );
      });
    });

    return successResponse(req, res, { campaigns });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.fetchCampaign = async (req, res) => {
  try {
    let campaignId = req.params.campaignId;

    let campaign = await campaign_model.findOne({
      where: { campaignId },
      include: [
        {
          model: campaignInfluencer_model,
          as: "influencer",
        },
      ],
    });

    campaign = { ...campaign.get() };
    campaign.channels = [];
    campaign.channels = attachChannels(campaign);
    campaign.influencersArray = [];

    //this piece of code is also substitution for a get request to influencer application
    campaign.influencer.forEach((obj) => {
      campaign.influencersArray.push(
        influencer.find((o) => o.id == obj.influencerId)
      );
    });
    return successResponse(req, res, { campaign });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.create = async (req, res) => {
  try {
    let body = req.body;
    body.companyId = req.user.companyId;
    body.campaignId = uniqueId();
    let campaign = await campaign_model.create(body);
    return successResponse(req, res, { campaign });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message);
  }
};

exports.inactivateCampaign = async (req, res) => {
  try {
    let campaignId = req.params.campaign;
    await campaign_model.update({ isActive: 0 }, { where: { campaignId } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    let updateParams = req.body;
    let campaignId = req.params.campaignId;
    await campaign_model.update(updateParams, {
      where: { campaignId },
    });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.assignInfluencer = async (req, res) => {
  try {
    let body = req.body;
    body.campaignId = req.params.campaignId;
    body.campaignInfluencerId = uniqueId();
    await campaignInfluencer_model.create(body);
    return successResponse(req, res, {});
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message);
  }
};
