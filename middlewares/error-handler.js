const { DEFAULT_ERROR_MESSAG } = require('../utils/const');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? DEFAULT_ERROR_MESSAG : message,
    });
};
