const rbac = require('../models/Permission');

async function getPermissions(req, res, next) {
  try {
    let permissions = await rbac.getPermissions();
    res.status(200).json({ status: 'success', code: 200, data: permissions });
  } catch (error) {
    next(error);
  }
}

module.exports = { getPermissions };
