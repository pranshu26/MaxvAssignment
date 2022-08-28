const Joi = require("joi");

exports.create = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
  },
  query: {
    campaignId: Joi.string().required(),
  },
};

exports.getAll = {
  params: {
    campaignId: Joi.string().required(),
  },
};
