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

  get_all_post({ page_num, cb}) {
    page_num = (page_num - 1) * 5;
    DBService.dbPool.query(
      "SELECT post_id, body, image, posts.user_id, users.name, posted_at FROM posts LEFT JOIN users ON users.user_id = posts.user_id ORDER BY post_id DESC LIMIT ?, 5",
      [page_num],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  get_all_post_pages({ cb }) {
    DBService.dbPool.query(
      "SELECT count(*) AS pages FROM posts",
      [],
      (error, results) => {
        results[0]['pages'] = Math.ceil(results[0]['pages']/5);
        cb(error, results);
      }
    );
  }

  get_all_users({ page_num, cb}) {
    page_num = (page_num - 1) * 5;
    DBService.dbPool.query(
      "SELECT user_id, name, email, signup_date FROM users LIMIT ?, 5",
      [page_num],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  get_all_users_pages({ cb }) {
    DBService.dbPool.query(
      "SELECT count(*) AS pages FROM users",
      [],
      (error, results) => {
        results[0]['pages'] = Math.ceil(results[0]['pages']/5);
        cb(error, results);
      }
    );
  }

  deletePost({ post_id, cb }) {
    DBService.dbPool.query(
      "DELETE FROM posts WHERE post_id = ?",
      [post_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

  deleteUser({ user_id, cb }) {
    DBService.dbPool.query(
      "DELETE FROM users WHERE user_id = ?",
      [user_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

}

module.exports.AdminModel = new AdminModel();
