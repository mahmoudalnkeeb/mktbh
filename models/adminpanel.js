const shortid = require('shortid');
const pool = require('../configs/db');

async function getUserRoles(user_id) {
  let client = await pool.connect();
  try {
    let query = await client.query('SELECT role_id , role_name FROM roles r JOIN user_roles ur ON r.role_id = ur.role_id JOIN users u ON u.user_id = ur.user_id WHERE u.user_id=$1', [user_id]);
    return query.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
async function getRolePermissions(role_id) {
  let client = await pool.connect();
  try {
    let query = await client.query('SELECT p.permission_id , p.permission_name FROM permissions p JOIN role_permissions rp ON p.permission_id = pr.permission_id     WHERE rp.role_id=$1', [role_id]);
    return query.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function getUserPermissions(user_id) {
  let client = await pool.connect();
  try {
    let query = await client.query(
      `SELECT p.permission_id , p.permission_name 
        FROM permissions p 
        JOIN role_permissions rp ON p.permission_id = rp.permission_id 
        JOIN user_roles ur ON rp.role_id = ur.role_id 
        JOIN users u ON u.user_id = ur.user_id 
       WHERE u.user_id = $1`,
      [user_id]
    );
    return query.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function createRolePermission(role_id, permission_id) {
  let client = await pool.connect();
  try {
    let id = shortid.generate();
    let query = await client.query('INSERT INTO role_permissions(id, permission_id , role_id) VALUES($1 , $2 , $3) RETURNING id, permission_id , role_id', [id, permission_id, role_id]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function createUserRole(user_id, role_id) {
  let client = await pool.connect();
  try {
    let id = shortid.generate();
    let query = await client.query('INSERT INTO user_roles(id, user_id , role_id) VALUES($1 , $2 , $3) RETURNING id, user_id , role_id', [id, user_id, role_id]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

// remove user role

// edit role permissions

module.exports = {
  getUserRoles,
  getRolePermissions,
  getUserPermissions,
  createRolePermission,
  createUserRole,
};
