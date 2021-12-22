const e = require("express");
const { UserModel } = require("../models/UserModel");
const { ForbiddenException } = require("../utils/exceptions/AuthException");
const { failureResponse } = require("../utils/responses");

const verifyAdmin = (req, res, next) => {
  const { user_id } = req;

  function cb(error, results) {
    try {
      if (error || !results) {
        throw new ForbiddenException();
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  UserModel.findRoleById({ user_id, cb });
};

module.exports = verifyAdmin;
