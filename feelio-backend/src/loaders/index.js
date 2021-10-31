const { DBLoader } = require("./DBLoader");
const { ExpressLoader } = require("./ExpressLoader");
const { MiddlewareLoader } = require("./MiddlewareLoader");
const { RouteLoader } = require("./RouteLoader");

const setup = ({ expressApp }) => {
  ExpressLoader.init(expressApp);
  console.log("Express Initialized");

  MiddlewareLoader.init();
  console.log("Middlewares Initialized");

  RouteLoader.init();
  console.log("Middlewares Initialized");

  DBLoader.init();
  console.log("MYSQL Initialized");
};

module.exports = { setup };
