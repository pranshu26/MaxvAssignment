const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    productId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "productId",
    },
    campaignId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "campaignId",
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "description",
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
    tableName: "product",
    comment: "",
    indexes: [],
    timestamps: false,
  };
  const ProductModel = sequelize.define("product_model", attributes, options);
  return ProductModel;
};
