const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");
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
