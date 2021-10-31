const { ErrorStatusCodes } = require("../errorStatusCodes");

class DBException extends Error {
  constructor(
    message,
    data,
    isOperational = false,
    status = ErrorStatusCodes.NotFound
  ) {
    super(message);

    if (process.env.NODE_ENV === "dev") this.message = "Database Error: " + message;
    else this.message = message;

    this.name = "Database Error";
    this.status = status;
    this.data = data;
    this.isOperational = isOperational;
  }
}

class DuplicateEntryException extends DBException {
  constructor(message, data) {
    super(message, data, true, ErrorStatusCodes.DuplicateEntry);
  }
}

class ForeignKeyViolationException extends DBException {
  constructor(message, data) {
    super(message, data, true, ErrorStatusCodes.ForeignKeyViolation);
  }
}

module.exports = {
  DBException,
  ForeignKeyViolationException,
  DuplicateEntryException,
};
