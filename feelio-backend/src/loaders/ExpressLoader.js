const express = require("express");
const cors = require("cors");

class ExpressLoader {
  static init(app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.static("uploads"));

    return app;
  }
}

module.exports = { ExpressLoader };
