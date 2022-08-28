const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { users_model } = require("../../models");
const { companies_model } = require("../../models");
const { successResponse, errorResponse, uniqueId } = require("../../helpers");

exports.register = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, companyName, companyWebsite } = req.body;

    const user = await users_model.findOne({
      where: { email },
    });
    if (user) {
      throw new Error("User already exists with same email");
    }
    let domain = email.split("@")[1];

    let companyPayload = {
      name: companyName,
      companyId: uniqueId(),
      domain: domain,
      website: companyWebsite,
    };
    let company = await companies_model.findOne({
      where: { domain },
      raw: true,
    });

    if (company) {
      throw new Error("User already exists with same domain");
    }
    const reqPass = crypto.createHash("md5").update(password).digest("hex");
    const userPayload = {
      email,
      password: reqPass,
      isVerified: false,
      verifyToken: uniqueId(),
      userId: uniqueId(),
      companyId: companyPayload.companyId,
      accessLevel: "admin",
    };
    await companies_model.create(companyPayload);
    const newUser = await users_model.create(userPayload);
    const token = jwt.sign(
      {
        user: {
          userId: newUser.id,
          email: newUser.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET
    );
    return successResponse(req, res, { newUser, token });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await users_model.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      throw new Error("Incorrect Email Id/Password");
    }
    const reqPass = crypto
      .createHash("md5")
      .update(req.body.password || "")
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Incorrect Email Id/Password");
    }
    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET
    );
    delete user.dataValues.password;
    return successResponse(req, res, { user, token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.profile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await users_model.findOne({ where: { id: userId } });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await users_model.findOne({
      where: { email },
    });

    const reqPass = crypto
      .createHash("md5")
      .update(req.body.oldPassword)
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Old password is incorrect");
    }

    const newPass = crypto
      .createHash("md5")
      .update(req.body.newPassword)
      .digest("hex");

    await users_model.update({ password: newPass }, { where: { id: user.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
