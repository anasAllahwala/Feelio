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

  get_all_posts({ page_num, cb }) {
    let results_num = 5;
    let page = 1;
    if (page_num) page = page_num;
    page = (page - 1) * results_num;

    DBService.dbPool.query(
      "SELECT post_id, body, image, posts.user_id, users.name, posted_at FROM posts LEFT JOIN users ON users.user_id = posts.user_id ORDER BY post_id DESC LIMIT ?, ?",
      [page, results_num],
      (error, results) => {
        let data = {
          data: { ...results },
          currPage: page / results_num + 1,
        };
        this.get_all_post_pages({ cb, data }, results_num);
      }
    );
  }

  get_all_post_pages({ cb, data }, perPage) {
    DBService.dbPool.query(
      "SELECT count(*) AS pages FROM posts",
      [],
      (error, results) => {
        data["pages"] = Math.ceil(results[0]["pages"] / perPage);
        cb(error, data);
      }
    );
  }

  get_all_users({ page_num, cb }) {
    let results_num = 1;
    let page = 1;
    if (page_num) page = page_num;
    page = (page - 1) * results_num;

    DBService.dbPool.query(
      "SELECT user_id, name, email, signup_date, role_name FROM users LEFT JOIN roles on users.role_id = roles.role_id LIMIT ?, ?",
      [page, results_num],
      (error, results) => {
        let data = {
          data: { ...results },
          currPage: page / results_num + 1,
        };
        this.get_all_users_pages({ cb, data }, results_num);
      }
    );
  }

  get_all_users_pages({ cb, data }, perPage) {
    DBService.dbPool.query(
      "SELECT count(*) AS pages FROM users",
      [],
      (error, results) => {
        data["pages"] = Math.ceil(results[0]["pages"] / perPage);
        cb(error, data);
      }
    );
  }

  deletePost({ post_id, cb }) {
    DBService.dbPool.query(
      "DELETE FROM posts WHERE post_id = ?",
      [post_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  deleteUser({ user_id, cb }) {
    DBService.dbPool.query(
      "DELETE FROM users WHERE user_id = ?",
      [user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }
}

module.exports.AdminModel = new AdminModel();
