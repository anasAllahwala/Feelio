const { DBLoader } = require("./db");
const { ExpressLoader } = require("./express");

const setup = ({ expressApp }) => {
  DBLoader.init();
  console.log("MYSQL Initialized");

  ExpressLoader.init(expressApp);
  console.log("Express Initialized");
};

module.exports = { setup };
