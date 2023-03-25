const { request, response } = require('express');
const { checkUserToken } = require('../models/User');
const { verfiyJwt } = require('../utils/authUtils');
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

async function isAuthenticated(req, res, next) {
  let token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).json({ success: false, message: 'token required' });
  let user = verfiyJwt(token);
  if (!user)
    return res.status(403).json({ success: false, message: 'unauthenticated' });
  let user_id = user.sub;
  let tokenValid = await checkUserToken(user_id, token);
  if (!tokenValid)
    return res.status(403).json({ success: false, message: 'unauthenticated' });
  req.user = user_id;
  next();
}

module.exports = isAuthenticated;
