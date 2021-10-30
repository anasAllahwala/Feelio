class DBException extends Error {
  constructor(message, isOperational = false) {
    super(message);
    this.message = "Database Error: " + message;
    this.name = "Database Error";
    this.isOperational = isOperational;
  }
}

module.exports = { DBException };
