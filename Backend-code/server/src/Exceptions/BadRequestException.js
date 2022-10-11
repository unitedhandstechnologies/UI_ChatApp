const { AppError } = require("./AppError");

class BadRequest extends AppError {
  constructor(message, code=400 ) {
    super({ message, code });
    this.code = code;
    this.message = message;
  }
}


module.exports = BadRequest;