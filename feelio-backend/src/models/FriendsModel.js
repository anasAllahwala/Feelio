const { DBService } = require("../services/DBService");

class FriendsModel {
  findPendingByUser({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT friend_request_id, sender_id, users.name as sender_name, friend_request_date FROM friend_requests INNER JOIN users ON friend_requests.sender_id = users.user_id WHERE status = 'Pending' AND receiver_id = ? ORDER BY friend_request_date DESC",
      [user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  findPendingById({ req_id, cb }) {
    DBService.dbPool.query(
      "SELECT friend_request_id, sender_id, users.name as sender_name, friend_request_date FROM friend_requests INNER JOIN users ON friend_requests.sender_id = users.user_id WHERE status = 'Pending' AND friend_request_id = ? ORDER BY friend_request_date DESC",
      [req_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  findAcceptedByUser({ user_id, cb }) {
    DBService.dbPool.query(
      "SELECT friend_request_id, IF(sender_id = ?, receiver_id, sender_id) as friend_id, users.name as friend_name, friend_request_date FROM friend_requests INNER JOIN users ON IF(sender_id = ?, receiver_id, sender_id) = users.user_id WHERE status = 'Accepted' AND (sender_id = ? OR receiver_id = ?) ORDER BY friend_request_date DESC",
      [user_id, user_id, user_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  acceptRequest({ user_id, friend_request_id, cb }) {
    DBService.dbPool.query(
      "UPDATE friend_requests SET status = 'Accepted' WHERE friend_request_id = ? AND receiver_id = ?",
      [friend_request_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  declineRequest({ user_id, friend_request_id, cb }) {
    DBService.dbPool.query(
      "UPDATE friend_requests SET status = 'Declined' WHERE friend_request_id = ? AND receiver_id = ?",
      [friend_request_id, user_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }

  async create({ user_id, friend_id, cb }) {
    var countFriend = 0;

    const promisePool = DBService.dbPool.promise();

    const [rows, fields] = await promisePool.query(
      "SELECT count(*) as count FROM friend_requests WHERE ((sender_id = ? AND receiver_id = ?) OR (receiver_id = ? AND sender_id = ?))",
      [user_id, friend_id, user_id, friend_id]
    );

    countFriend = rows[0].count;

    if (countFriend == 0) {
      DBService.dbPool.query(
        "INSERT INTO friend_requests (sender_id, receiver_id) VALUES (?, ?)",
        [user_id, friend_id],
        (error, results) => {
          cb(error, results);
        }
      );
    } else {
      cb(1, 0);
    }
  }
}

module.exports.FriendsModel = new FriendsModel();
