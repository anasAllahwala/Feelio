const { DBService } = require("../services/DBService");

class FriendsModel {
  findPendingByUser({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT user_a_id, user_b_id, friend_request_date from friend_requests where status = 'Pending' AND (user_a_id = ? OR user_b_id = ?) ORDER BY friend_request_date DESC",
      [user_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  findAcceptedByUser({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT user_a_id, user_b_id, friend_request_date from friend_requests where status = 'Accepted' AND (user_a_id = ? OR user_b_id = ?) ORDER BY friend_request_date DESC",
      [user_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  checkFriends({ user_id, friend_id, cb }) {
    DBService.dbPool.query(
      "SELECT count(*) where ((user_a_id = ? AND user_b_id = ?) OR (user_b_id = ? AND user_a_id = ?))",
      [user_id, friend_id, user_id, friend_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  create({ user_id, friend_id, cb }) {
    DBService.dbPool.query(
      "INSERT INTO friend_requests (user_a_id, user_b_id) VALUES (?, ?)",
      [user_id, friend_id],
      (error, results) => {
        cb(error, results.insertId);
      }
    );
  }
}

module.exports.FriendsModel = new FriendsModel();
