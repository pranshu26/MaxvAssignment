const Joi = require("joi");

exports.changePassword = {
  body: {
    email: Joi.string().email().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  },
};

exports.register = {
  body: {
    companyName: Joi.string().required(),
    companyWebsite: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

exports.login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};
