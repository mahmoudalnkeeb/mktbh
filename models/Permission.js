async function getPermissions() {
  let client = await pool.connect();
  try {
    let query = await client.query(
      'SELECT permission_id , permission_name FROM permissions'
    );
    return query.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
async function createPermission(permission_name) {
  let client = await pool.connect();
  try {
    let id = shortid.generate();
    let query = await client.query(
      'INSERT INTO permissions( permission_id , permission_name) VALUES($1 , $2) RETURNING permission_id , permission_name',
      [id, permission_name]
    );
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { getPermissions, createPermission };
