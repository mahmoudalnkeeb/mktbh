function boomHandler(err, req, res, next) {
  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    res.status(statusCode).json(payload);
  } else {
    next(err);
  }
}


module.exports = boomHandler