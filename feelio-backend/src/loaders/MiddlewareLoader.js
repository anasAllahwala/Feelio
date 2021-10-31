const ErrorMiddleware = require("../middlewares/errorMiddleware");

class MiddlewareLoader {
  static init(app) {
    app.all("*", (req, res, next) => {
      const err = new InvalidEndpointException();
      next(err);
    });

    app.use(ErrorMiddleware);
  }
}

module.exports = { MiddlewareLoader };
