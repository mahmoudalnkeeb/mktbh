const pool = require('../configs/db');
const migrations = require('../migrations/migrations');

async function isTableExists(table) {
  let client = await pool.connect();
  try {
    let query = await client.query(
      `SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  =$1)`,
      [table]
    );
    return query.rows[0].exists;
  } catch (error) {
    client.release();
    throw new Error('adding service failed  - ${error.message}');
  } finally {
    client.release();
  }
}

async function migrateTableUp(table) {
  let client = await pool.connect();
  try {
    if (await isTableExists(table)) return 'already exists';
    let sql = migrations[table].up;
    let query = await client.query(sql);
    return query;
  } catch (error) {
    console.log(error);
    client.release();
    throw new Error(`adding table failed  - ${error.message}`);
  } finally {
    client.release();
  }
}

async function migrateTableDown(table) {
  let client = await pool.connect();
  try {
    let sql = migrations[table].down;
    let query = await client.query(sql);
    return query;
  } catch (error) {
    client.release();
    throw new Error(`adding table failed  - ${error.message}`);
  } finally {
    client.release();
  }
}

module.exports = {
  migrateTableDown,
  migrateTableUp,
};
