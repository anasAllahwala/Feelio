const { ErrorStatusCodes } = require("../errorStatusCodes");

class AuthException extends Error {
  constructor(message, data, status = ErrorStatusCodes.Unauthorized) {
    super(message);

    if (process.env.NODE_ENV === "dev") this.message = "Auth Error: " + message;
    else this.message = message;

    this.name = "Auth Error";
    this.code = this.constructor.name;
    this.status = status;
    this.data = data;
  }
}

class ForbiddenException extends AuthException {
  constructor(message = "User unauthorized for action", data) {
    super(message, data, ErrorStatusCodes.Forbidden);
  }
}

class TokenMissingException extends AuthException {
  constructor(message = "Access denied. No token credentials sent", data) {
    super(message, data);
  }
}

class TokenVerificationException extends AuthException {
  constructor(message = "Authentication failed", data) {
    super(message, data);
  }
}

class TokenExpiredException extends AuthException {
  constructor(message = "JWT expired", data) {
    super(message, data);
  }
}

class InvalidCredentialsException extends AuthException {
  constructor(message, data) {
    super(message, data);
  }
}

class RegistrationFailedException extends AuthException {
  constructor(message = "User failed to be registered", data) {
    super(message, data, ErrorStatusCodes.InternalServerError);
  }
}

module.exports = {
  TokenMissingException,
  InvalidCredentialsException,
  TokenVerificationException,
  TokenExpiredException,
  ForbiddenException,
  RegistrationFailedException,
};
