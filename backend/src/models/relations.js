"use strict";
module.exports = (model) => {
  model.campaign_model.hasMany(model.campaignInfluencer_model, {
    foreignKey: "campaignId",
    targetKey: "campaignId",
    as: "influencer",
  });
};
