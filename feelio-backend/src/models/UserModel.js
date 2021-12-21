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

  changePassword({user_id, password, cb }) {
    password = hash.create(password);
    DBService.dbPool.query(
      "UPDATE users SET password = ? WHERE user_id = ?",
      [password, user_id],
      (error, results) => {
        cb(error, results?.insertId);
      }
    );
  }

  // :(
  /*
  resetPassword({ email , cb }) {
    DBService.dbPool.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if(error || results.length == 0){
          cb(error, results, results.length);
        }  
        else{
          const user_id = results[0]['user_id'];
          const code = hash.create(user_id + Date.now().toString());
          DBService.dbPool.query(
            "SELECT COUNT(*) as count FROM reset_password WHERE user_id = ?",
            [user_id],
            (error, results) => {
              if(error){
                cb(error, results, 1);
              }        
              else if(results[0]['count'] == 0){
                DBService.dbPool.query(
                  "INSERT INTO reset_password (user_id, code) VALUES (?, ?)",
                  [user_id, code],
                  (error, results) => {
                    cb(error, code, 1);
                  }
                );
              }
              else{
                DBService.dbPool.query(
                  "UPDATE reset_password SET code = ? WHERE user_id = ? ",
                  [code, user_id],
                  (error, results) => {
                    cb(error, code, 1);
                  }
                );
              }
            }
          );
        }
      }
    );    
  }
  */

  login({ email, cb }) {
    this.findByEmail({ email, cb });
  }
}

module.exports.UserModel = new UserModel();
