const { DBService } = require("../services/DBService");

class PostModel {
  findById({ user_id, post_id, cb }) {
    DBService.dbPool.query(
      "SELECT body, image, user_id, posted_at from posts WHERE post_id = ? AND (user_id = ? OR user_id IN (SELECT IF(sender_id = ?, receiver_id, sender_id) as user_id FROM friend_requests WHERE status = 'Accepted' AND (sender_id = ? OR receiver_id = ?)))",
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

  findByFriends({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT body, image, user_id, posted_at from posts where user_id IN (SELECT IF(sender_id = ?, receiver_id, sender_id) as user_id FROM friend_requests WHERE status = 'Accepted' AND (sender_id = ? OR receiver_id = ?)) ORDER BY post_id DESC",
      [user_id, user_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
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
