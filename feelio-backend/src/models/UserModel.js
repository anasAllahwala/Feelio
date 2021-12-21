const { hash } = require("../helpers/hash");
const { DBService } = require("../services/DBService");

class UserModel {

  findRoleById({user_id, cb}){
    DBService.dbPool.query(
      "SELECT role_id, role_name from users LEFT JOIN roles on users.role_id = roles.role_id where user_id = ?",
      [user_id],
      (error, results) => {
        cb(error, results[0]);
      }
    );
  }

  findById({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT user_id, name, email, role_name from users LEFT JOIN roles on users.role_id = roles.role_id where user_id = ?",
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
      "SELECT `role_id` FROM roles WHERE `role_name`='user'",
      [],
      (error, results) => {
        DBService.dbPool.query(
          "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
          [name, email, password, results[0].role_id],
          (error, results) => {
            cb(error, results?.insertId);
          }
        );
      }
    );
  }

  login({ email, cb }) {
    this.findByEmail({ email, cb });
  }
}

module.exports.UserModel = new UserModel();
