async function getRoles() {
  let client = await pool.connect();
  try {
    let query = await client.query('SELECT role_id , role_name FROM roles');
    return query.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
async function createRole(roleName) {
  let client = await pool.connect();
  try {
    let id = shortid.generate();
    let query = await client.query('INSERT INTO roles(role_id , role_name) VALUES($1 , $2) RETURNING role_id , role_name', [id, roleName]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function updateRoleName(id, role_name) {
  let client = await pool.connect();
  try {
    let query = await client.query('UPDATE roles SET role_name=$2 , updated_at = NOW() WHERE role_id = $1 RETURNING role_name , role_id', [id, role_name]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function deleteRole(id) {
  let client = await pool.connect();
  try {
    let query = await client.query('DELETE FROM roles WHERE role_id = $1 RETURNING role_id , role_name', [id]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  createRole,
  getRoles,
  updateRoleName,
  deleteRole,
};
