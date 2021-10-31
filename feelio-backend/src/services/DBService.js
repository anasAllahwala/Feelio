const mysql = require("mysql2");
const { DBException } = require("../utils/exceptions/DatabaseException");
class DBService {
  init({ host, user, pass, name }) {
    if (!this.dbPool) {
      this.dbPool = mysql.createPool({
        host,
        user,
        database: name,
        password: pass,
      });

      this.asyncPool = this.dbPool.promise();
    }
  }

  checkConnection() {
    this.dbPool.getConnection((err, connection) => {
      if (err) {
        switch (err.code) {
          case "PROTOCOL_CONNECTION_LOST":
            throw new DBException("Database connection has been lost!");
          case "ER_CON_COUNT_ERROR":
            throw new DBException("Database has too many connections!");
          case "ECONNREFUSED":
            throw new DBException("Database connection was refused!");
        }
      }

      if (connection) {
        connection.release();
      }
    });
  }
}

module.exports.DBService = new DBService();
