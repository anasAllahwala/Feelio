const { DBService } = require("../services/DBService");

class PostModel {
  findById({ user_id, post_id, cb }) {
    DBService.dbPool.query(
      "SELECT posts.post_id, body, image_url, posts.user_id, users.name, posted_at, COUNT(reacts.react_id) as reacts, COUNT(comments.comment_id) as comments FROM posts LEFT JOIN users ON users.user_id = posts.user_id LEFT JOIN reacts on posts.post_id = reacts.post_id LEFT JOIN comments on posts.post_id = comments.post_id WHERE posts.post_id = ? AND (posts.user_id = ? OR posts.user_id IN (SELECT IF(sender_id = ?, receiver_id, sender_id) as user_id FROM friend_requests WHERE status = 'Accepted' AND (sender_id = ? OR receiver_id = ?)))",
      [post_id, user_id, user_id, user_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  findByFriends({ user_id, last_post_id, cb }) {
    let params = [user_id, user_id, user_id, user_id];

    let post_condition = "";

    if (last_post_id) {
      post_condition = "AND post_id < ?";
      params.push(last_post_id);
    }
    let sql =
      "SELECT posts.post_id, body, image_url, posts.user_id, users.name, posted_at, COUNT(reacts.react_id) as reacts, COUNT(comments.comment_id) as comments FROM posts LEFT JOIN users ON users.user_id = posts.user_id LEFT JOIN reacts on posts.post_id = reacts.post_id LEFT JOIN comments on posts.post_id = comments.post_id WHERE (posts.user_id = ? OR posts.user_id IN (SELECT IF(sender_id = ?, receiver_id, sender_id) as user_id FROM friend_requests WHERE status = 'Accepted' AND (sender_id = ? OR receiver_id = ?))) GROUP BY posts.post_id, body, image_url, posts.user_id, users.name,posted_at" +
      post_condition +
      " ORDER BY post_id DESC LIMIT 25";

    DBService.dbPool.query(sql, params, (error, results) => {
      cb(error, results);
    });
  }

  findByUser({ user_id, last_post_id, cb }) {
    let params = [user_id];

    let post_condition = "";

    if (last_post_id) {
      post_condition = "AND post_id < ?";
      params.push(last_post_id);
    }
    let sql =
      "SELECT post_id, body, image_url, posts.user_id, users.name, posted_at FROM posts LEFT JOIN users ON users.user_id = posts.user_id WHERE posts.user_id = ? " +
      post_condition +
      " ORDER BY post_id DESC LIMIT 25";

    DBService.dbPool.query(sql, params, (error, results) => {
      cb(error, results);
    });
  }

  create({ body, image, user_id, cb }) {
    DBService.dbPool.query(
      "INSERT INTO posts (body, image_url, user_id) VALUES (?, ?, ?)",
      [body, image, user_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

  addComment({ user_id, post_id, comment, cb }) {
    DBService.dbPool.query(
      "INSERT INTO comments (user_id, post_id, comment) VALUES (?, ?, ?)",
      [user_id, post_id, comment],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

  addReact({ user_id, post_id, cb }) {
    DBService.dbPool.query(
      "INSERT INTO reacts (user_id, post_id) VALUES (?, ?)",
      [user_id, post_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

  getPostComments({ post_id, cb }) {
    DBService.dbPool.query(
      "SELECT users.name AS user_name, comment, comment_date FROM comments LEFT JOIN users on comments.user_id = users.user_id WHERE post_id = ? ORDER BY comment_date DESC",
      [post_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }

  getPostReacts({ post_id, cb }) {
    DBService.dbPool.query(
      "SELECT COUNT(*) AS likes FROM reacts WHERE post_id = ?",
      [post_id],
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
