class InternalServerException {

  constructor(message, isOperational = false) {
    super(message);
    this.message = "Database Error: " + message;
    this.name = "Server Error";
    this.isOperational = isOperational;
  }

}

module.exports = {InternalServerException};