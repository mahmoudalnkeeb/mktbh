const adminPanel = require('../models/adminpanel');
const users = require('../models/User');

// users
async function login(req, res, next) {
  try {
    let { username, password } = req.body;
    let checkPass = await users.checkUserPassword(username, password);
    if (!checkPass)
      return res.status(403).json({
        status: 'failed',
        code: 403,
        message: 'check username or password',
      });
    let user_id = await users.getUserId(username);
    let token = await users.addToken(user_id.user_id);
    // req.session.user = token.access_token;
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
}

async function signup(req, res, next) {
  try {
    let { username, email, password } = req.body;
    let user = await users.createUser(username, email, password);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    let { page, limit } = req.query;
    let allUsers = await users.getUsers(page, limit);
    return res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    let { id } = req.params;
    let { username, email } = req.body;
    let user = await users.updateUser(id, username, email);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    let { id } = req.params;
    let user = await users.deleteUser(id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

// panel controllers

async function getUserPermissions(req, res, next) {
  try {
    let { id } = req.params;
    let userPerms = await adminPanel.getUserPermissions(id);
    return res.status(200).json({ success: true, data: userPerms });
  } catch (error) {
    next(error);
  }
}

async function getRolePermissions(req, res, next) {
  try {
    let { id } = req.params;
    let rolePerms = await adminPanel.getRolePermissions(id);
    return res.status(200).json({ success: true, data: rolePerms });
  } catch (error) {
    next(error);
  }
}

async function getUserRoles(req, res, next) {
  try {
    let { id } = req.params;
    let userRoles = await adminPanel.getUserRoles(id);
    return res.status(200).json({ success: true, data: userRoles });
  } catch (error) {
    next(error);
  }
}

async function createUserRole(req, res, next) {
  try {
    let { role_id, user_id } = req.body;
    let userRole = await adminPanel.createUserRole(user_id, role_id);
    return res.status(200).json({ success: true, data: userRole });
  } catch (error) {
    next(error);
  }
}
async function createRolePermission(req, res, next) {
  try {
    let { role_id, permission_id } = req.body;
    let rolePermission = await adminPanel.createRolePermission(role_id, permission_id);
    return res.status(200).json({ success: true, data: rolePermission });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  signup,
  getUsers,
  updateUser,
  deleteUser,
  getRolePermissions,
  getUserPermissions,
  getUserRoles,
  createUserRole,
  createRolePermission,
};
