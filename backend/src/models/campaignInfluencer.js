const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    campaignInfluencerId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "campaignInfluencerId",
    },
    campaignId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "campaignId",
    },
    influencerId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "InfluencerId",
    },
    addedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "addedOn",
    },
    updatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedOn",
    },
  };
  const options = {
    tableName: "campaignInfluencer",
    comment: "",
    indexes: [],
    timestamps: false,
  };
  const CampaignInfluencerModel = sequelize.define(
    "campaignInfluencer_model",
    attributes,
    options
  );
  return CampaignInfluencerModel;
};
