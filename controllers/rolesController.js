const roles = require('../models/Role');

async function getRoles(req, res, next) {
  try {
    let allRoles = await roles.getRoles();
    res.status(200).json({ success: true, data: allRoles });
  } catch (error) {
    next(error);
  }
}

async function createRole(req, res, next) {
  try {
    let { role_name } = req.body;
    let role = await roles.createRole(role_name);
    res.status(201).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
}

async function updateRoleName(req, res, next) {
  try {
    let { role_name } = req.body;
    let role = await roles.updateRoleName(role_name);
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
}

async function deleteRole(req, res, next) {
  try {
    let { role_id } = req.body;
    let role = await roles.deleteRole(role_id);
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
}

module.exports = { createRole, getRoles, updateRoleName, deleteRole };
