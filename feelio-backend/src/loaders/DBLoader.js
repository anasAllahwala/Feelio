const { DBService } = require("../services/DBService");
class DBLoader {

  static init() {
    DBService.init({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    });

    DBService.checkConnection();
  }
}

module.exports = { DBLoader };
