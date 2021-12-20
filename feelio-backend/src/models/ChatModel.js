const { DBService } = require("../services/DBService");

class ChatModel {
  newMessage({ friend_request_id, user_id, message, cb }) {
    DBService.dbPool.query(
      "INSERT INTO chat (friend_request_id, user_id, message) VALUES (?, ?, ?)",
      [friend_request_id, user_id, message],
      (error, results) => {
        DBService.dbPool.query(
          "SELECT name, message, created_at FROM chat LEFT JOIN users ON users.user_id = chat.user_id WHERE chat_id = ?",
          [results.insertId, friend_request_id],
          (error, results) => {
            cb(error, results[0]);
          }
        );
      }
    );
  }

  getMessages({ friend_request_id, cb }) {
    DBService.dbPool.query(
      "SELECT name, message, created_at FROM chat LEFT JOIN users ON users.user_id = chat.user_id WHERE chat.friend_request_id = ?",
      [friend_request_id],
      (error, results) => {
        cb(error, results);
      }
    );
  }
}

module.exports.ChatModel = new ChatModel();
