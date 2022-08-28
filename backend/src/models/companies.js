const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    companyId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "companyId",
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name",
    },
    domain: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "domain",
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
      allowNull: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedOn",
    },
  };
  const options = {
    tableName: "companies",
    comment: "",
    indexes: [],
    timestamps: false,
  };
  const CompaniesModel = sequelize.define(
    "companies_model",
    attributes,
    options
  );
  return CompaniesModel;
};
