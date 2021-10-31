const { DBService } = require("../services/DBService");
class DBLoader {
  static init() {
    DBService.init({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    });

    try {
      console.log(`DATABASE ${process.env.DB_HOST}`);
      DBService.checkConnection();
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = { DBLoader };
