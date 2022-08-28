const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    userId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "userId",
    },
    companyId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "companyId",
    },
    accessLevel: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "accessLevel",
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email",
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "password",
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
    tableName: "users",
    comment: "",
    indexes: [],
    timestamps: false,
  };
  const UsersModel = sequelize.define("users_model", attributes, options);
  return UsersModel;
};
