const { DBService } = require("../services/DBService");

class FriendsModel {
  findPendingByUser({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT IF(user_a_id = ?, user_b_id, user_a_id) as friend_id, users.name as friend_name, friend_request_date FROM friend_requests INNER JOIN users ON IF(user_a_id = ?, user_b_id, user_a_id) = users.user_id WHERE status = 'Pending' AND (user_a_id = ? OR user_b_id = ?) ORDER BY friend_request_date DESC",
      [user_id, user_id, user_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  findAcceptedByUser({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT IF(user_a_id = ?, user_b_id, user_a_id) as friend_id, users.name as friend_name, friend_request_date FROM friend_requests INNER JOIN users ON IF(user_a_id = ?, user_b_id, user_a_id) = users.user_id WHERE status = 'Accepted' AND (user_a_id = ? OR user_b_id = ?) ORDER BY friend_request_date DESC",
      [user_id, user_id, user_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  acceptRequest({ friend_request_id, cb }) {
    DBService.dbPool.query(
      "UPDATE friend_requests SET status = 'Accepted' WHERE friend_request_id = ?",
      [friend_request_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  declineRequest({ friend_request_id, cb }) {
    DBService.dbPool.query(
      "UPDATE friend_requests SET status = 'Declined' WHERE friend_request_id = ?",
      [friend_request_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  checkFriends({ user_id, friend_id, cb }) {
    DBService.dbPool.query(
      "SELECT count(*) FROM friend_requests WHERE ((user_a_id = ? AND user_b_id = ?) OR (user_b_id = ? AND user_a_id = ?))",
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
