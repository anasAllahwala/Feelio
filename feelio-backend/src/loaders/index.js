const { DBLoader } = require("./DBLoader");
const { ExpressLoader } = require("./ExpressLoader");
const { MiddlewareLoader } = require("./MiddlewareLoader");
const { RouteLoader } = require("./RouteLoader");

const setup = ({ expressApp }) => {
  ExpressLoader.init(expressApp);
  console.log("Express Initialized");

  MiddlewareLoader.init(expressApp);
  console.log("Middlewares Initialized");

  RouteLoader.init(expressApp);
  console.log("Routes Initialized");
};

DBLoader.init();

module.exports = { setup };
