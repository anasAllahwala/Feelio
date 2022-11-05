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

const jwt = require("jsonwebtoken");
const {
  TokenExpiredException,
  TokenVerificationException,
  TokenMissingException,
} = require("../utils/exceptions/AuthException");

const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    const tokenStart = "Bearer ";
    if (
      !bearerHeader ||
      (!bearerHeader.startsWith(tokenStart) &&
        !bearerHeader.startsWith(tokenStart.toLowerCase()))
    ) {
      throw new TokenMissingException();
    }

    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    let decoded;

    jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, result) => {
      if (err) {
        if (err.name == "TokenExpiredError") throw new TokenExpiredException();
        else if (err.name === "JsonWebTokenError")
          throw new TokenVerificationException();
      } else decoded = result;
    });

    let user_id = decoded.user_id;
    req.user_id = user_id;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = verifyToken;
