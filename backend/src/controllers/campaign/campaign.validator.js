const Joi = require("joi");

exports.fetchCampaign = {
  params: {
    campaignId: Joi.string().required(),
  },
};

exports.create = {
  body: {
    name: Joi.string().required(),
    durationInMonths: Joi.number().required(),
    budget: Joi.string().required(),
    campaignScript: Joi.string().required(),
  },
};

exports.assignInfluencer = {
  body: {
    influencerId: Joi.string().required(),
  },
  params: {
    campaignId: Joi.string().required(),
  },
};
