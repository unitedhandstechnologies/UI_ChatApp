const { AppError } = require("./AppError");

class ApiError extends AppError {
  constructor(message, code=403 ) {
    super({ message, code });
    this.code = code;
    this.message = message;
  }
}


module.exports = ApiError;
