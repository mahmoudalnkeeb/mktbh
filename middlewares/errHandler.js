const fs = require('fs');
const moment = require('moment/moment');

module.exports = function errHandler(err, req, res, next) {
  if (err) {
    fs.appendFileSync(
      './logs/errors.log',
      ` [${moment().format()}] ${err.message} \n error stack \n  : ${
        err.stack
      } \n -----------------------\n `
    );
    return res.status(500).json({
      message: 'internal server error',
      code: err.code || 500,
    });
  }
};
