const { ErrorStatusCodes } = require("../errorStatusCodes");

class ApiException extends Error {
  constructor(message, data, status = ErrorStatusCodes.Unauthorized) {
    super(message);

    if (process.env.NODE_ENV === "dev") this.message = "Api Error: " + message;
    else this.message = message;

    this.code = this.constructor.name;
    this.status = status;
    this.data = data;
  }
}

class InternalServerException extends ApiException {
  constructor(message, data) {
    super(message, data, ErrorStatusCodes.InternalServerError);
  }
}

class InvalidEndpointException extends ApiException {
  constructor(message = "Endpoint Not Found", data) {
    super(message, data, ErrorStatusCodes.InternalServerError);
  }
}

module.exports = { InternalServerException, InvalidEndpointException };
