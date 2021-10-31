const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    var decoded;

    try {
      decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
    } catch (e) {
      return res.status(401).json({
        header: {
          error: 1,
          message: "Unauthorized Request!",
        },
      });
    }
    var user_id = decoded.user_id;
    req.user_id = user_id;

    next();
  } else {
    res.sendStatus(403).json({
      header: {
        error: 1,
        message: "Forbidden Request!",
      },
    });
  }
};

module.exports = verifyToken;
