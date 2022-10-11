class AppError extends Error {
    constructor({ details = {}, message } = {}) {
      super(message || details.message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
      this.details = details;
    }
  }
  
  
  
  module.exports = {
    AppError, 
  };