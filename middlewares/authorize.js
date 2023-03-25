const { request, response } = require('express');
const { getUserPermissions } = require('../models/adminpanel');
const { verfiyJwt } = require('../utils/authUtils');
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

function auth(permission) {
  return {
    authorize: async (req, res, next) => {
      let token = req.headers['x-access-token'];
      if (!token)
        return res
          .status(403)
          .json({ success: false, code: 403, message: 'token required' });
      let user = verfiyJwt(token);
      if (!user)
        return res
          .status(403)
          .json({ success: false, code: 403, message: 'unauthorized' });
      let permissions = await getUserPermissions(user.sub);
      console.log(user.sub);
      let hasPerm = permissions
        .map((permission) => permission.permission_name)
        .includes(permission)
        ? true
        : permissions
            .map((permission) => permission.permission_name)
            .includes('ADMINSTRATOR');
      if (!hasPerm)
        return res
          .status(403)
          .json({ success: false, code: 403, message: 'unauthorized' });

      console.log(`authorized user ${user}`);
      next();
    },
  };
}

module.exports = auth;
