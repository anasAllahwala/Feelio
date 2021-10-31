const { DBLoader } = require("./DBLoader");
const { ExpressLoader } = require("./ExpressLoader");
const { MiddlewareLoader } = require("./MiddlewareLoader");
const { RouteLoader } = require("./RouteLoader");

const setup = ({ expressApp }) => {
  ExpressLoader.init(expressApp);
  console.log("Express Initialized");

  RouteLoader.init(expressApp);
  console.log("Routes Initialized");
  
  MiddlewareLoader.init(expressApp);
  console.log("Middlewares Initialized");

};

DBLoader.init();

module.exports = { setup };
