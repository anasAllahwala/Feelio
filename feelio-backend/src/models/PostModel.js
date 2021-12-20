const { DBService } = require("../services/DBService");

class PostModel {
  findById({ user_id, post_id, cb }) {
    DBService.dbPool.query(
      "SELECT post_id, body, image, posts.user_id, users.name, posted_at FROM posts LEFT JOIN users ON users.user_id = posts.user_id WHERE posts.post_id = ? AND (posts.user_id = ? OR posts.user_id IN (SELECT IF(sender_id = ?, receiver_id, sender_id) as user_id FROM friend_requests WHERE status = 'Accepted' AND (sender_id = ? OR receiver_id = ?)))",
      [post_id, user_id, user_id, user_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  /*
  findByUser({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT body, image, user_id, posted_at from posts where user_id = ? ORDER BY post_id DESC",
      [user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }
  */

  findByFriends({ user_id, last_post_id, cb }) {
    let params = [user_id, user_id, user_id, user_id];

    let post_condition = "";

    if (last_post_id) {
      post_condition = "AND post_id < ?";
      params.push(last_post_id);
    }
    let sql =
      "SELECT post_id, body, image, posts.user_id, users.name, posted_at FROM posts LEFT JOIN users ON users.user_id = posts.user_id WHERE (posts.user_id = ? OR posts.user_id IN (SELECT IF(sender_id = ?, receiver_id, sender_id) as user_id FROM friend_requests WHERE status = 'Accepted' AND (sender_id = ? OR receiver_id = ?))) " +
      post_condition +
      " ORDER BY post_id DESC LIMIT 25";

    DBService.dbPool.query(sql, params, (error, results) => {
      cb(error, results);
    });
  }

  create({ body, image, user_id, cb }) {
    DBService.dbPool.query(
      "INSERT INTO posts (body, image, user_id) VALUES (?, ?, ?)",
      [body, image, user_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

  edit({ user_id, body, image, post_id, cb }) {
    DBService.dbPool.query(
      "UPDATE posts SET body = ?, image = ? WHERE post_id = ? AND user_id = ?",
      [body, image, post_id, user_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

  delete({ user_id, post_id, cb }) {
    DBService.dbPool.query(
      "DELETE FROM posts WHERE post_id = ? AND user_id = ?",
      [post_id, user_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }
}

module.exports.PostModel = new PostModel();
