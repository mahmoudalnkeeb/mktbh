function validatePagination(req, res, next) {
  try {
    let { page, limit } = req.query;
    if (page < 0) return res.status(400).send('page must be at lease 1');
    if (typeof parseInt(page) != 'number')
      return res.status(400).send('page must be number');
    if (typeof parseInt(limit) != 'number')
      return res.status(400).send('page must be number');
    req.query.limit = parseInt(limit);
    req.query.page = parseInt(page);
    next();
  } catch (error) {
    next(error);
  }
}


module.exports = validatePagination