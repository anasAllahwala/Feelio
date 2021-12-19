const { DBService } = require("../services/DBService");

class AdminModel {
  get_total_users({ cb }) {
    DBService.dbPool.query(
      "SELECT COUNT(*) FROM users",
      [],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  get_total_new_users_today({ cb }) {
    DBService.dbPool.query(
      "SELECT COUNT(*) FROM users WHERE DATE(signup_date) = DATE(CURRENT_TIMESTAMP)",
      [],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  get_total_messages_send_today({ cb }) {
    DBService.dbPool.query(
      "SELECT COUNT(*) FROM chat WHERE DATE(date) = DATE(CURRENT_TIMESTAMP)",
      [],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  get_total_post_today({ cb }) {
    DBService.dbPool.query(
      "SELECT COUNT(*) FROM posts WHERE DATE(posted_at) = DATE(CURRENT_TIMESTAMP)",
      [],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  get_all_post({ last_post_id, cb }) {
    DBService.dbPool.query(
      "SELECT post_id, body, image, posts.user_id, users.name, posted_at FROM posts LEFT JOIN users ON users.user_id = posts.user_id WHERE post_id < ? ORDER BY post_id DESC LIMIT 1",
      [last_post_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  delete({ post_id, cb }) {
    DBService.dbPool.query(
      "DELETE FROM posts WHERE post_id = ?",
      [post_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

}

module.exports.AdminModel = new AdminModel();
