const { hash } = require("../helpers/hash");
const { DBService } = require("../services/DBService");

class UserModel {
  findById({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT user_id, name, email from users where user_id = ?",
      [user_id],
      (error, results) => {
        cb(error, results[0]);
      }
    );
  }

  findByEmail({ email, cb }) {
    DBService.dbPool.query(
      "SELECT user_id, name, password from users where email = ?",
      [email],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  create({ name, email, password, cb }) {
    password = hash.create(password);
    DBService.dbPool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (error, results) => {
        cb(error, results?.insertId);
      }
    );
  }

  resetPassword({ user_id/*, cb*/ }) {
    const code = hash.create(user_id + Date.now().toString());
    console.log(code.length);
    /*DBService.dbPool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (error, results) => {
        cb(error, results?.insertId);
      }
    );*/
  }

  login({ email, cb }) {
    this.findByEmail({ email, cb });
  }
}

module.exports.UserModel = new UserModel();
