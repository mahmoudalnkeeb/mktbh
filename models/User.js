const shortId = require('shortid');
const pool = require('../configs/db');
const { hash, createJwt, compare } = require('../utils/authUtils');

async function createUser(username, email, password) {
  let client = await pool.connect();
  try {
    let id = shortId.generate();
    let hashData = hash(password);
    let hashed_pass = hashData.hashed;
    let salt = hashData.salt;
    let sql = 'INSERT INTO users(user_id , username , email , hashed_pass , salt) VALUES($1 , $2 ,$3 , $4 , $5) RETURNING user_id , username , email , created_at';
    let query = await client.query(sql, [id, username, email, hashed_pass, salt]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function getUsers(page = 1, limit = null) {
  let client = await pool.connect();
  try {
    let offset = limit == null ? 0 : (page - 1) * limit;
    let sql = 'SELECT user_id , username , email , FROM users LIMIT COALESCE($1 , (SELECT COUNT(*) FROM users)) OFFSET $2';
    let query = await client.query(sql, [limit, offset]);
    return query.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function updateUser(id, username = null, email = null) {
  let client = await pool.connect();
  try {
    let sql = `UPDATE services SET
                  username = COALESCE($2, username),
                  email = COALESCE($3, email),
                  updated_at = NOW()
              WHERE user_id = $1 
              RETURNING user_id`;
    let query = await client.query(sql, [id, username, email]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function deleteUser(id) {
  let client = await pool.connect();
  try {
    let sql = 'DELETE FROM users WHERE user_id = $1 RETURNING  user_id';
    let query = await client.query(sql, [id]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

// auth

async function checkUsername(username) {
  let client = await pool.connect();
  try {
    let sql = 'SELECT user_id FROM users WHERE username =$1';
    let query = await client.query(sql, [username]);
    if (query.rowCount == 0) return false;
    return true;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function addToken(user_id) {
  let client = await pool.connect();
  try {
    let sql = 'UPDATE users SET access_token = $1 WHERE user_id = $2 RETURNING access_token ';
    let tokenData = createJwt({ sub: user_id }, '24h');
    let query = await client.query(sql, [tokenData.token, user_id]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function checkUserToken(user_id, token) {
  let client = await pool.connect();
  try {
    let sql = 'SELECT  access_token , token_secret FROM users WHERE user_id = $1';
    let query = await client.query(sql, [user_id]);
    if (query.rows.length == 0) return false;
    if (token == query.rows[0].access_token) return true;
    return false;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function checkUserPassword(username, password) {
  let client = await pool.connect();
  try {
    let sql = 'SELECT  hashed_pass , salt FROM users WHERE username = $1';
    let query = await client.query(sql, [username]);
    if (query.rows.length == 0) return false;
    if (compare(password, query.rows[0].salt, query.rows[0].hashed_pass)) return true;
    return false;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function getUserId(username) {
  let client = await pool.connect();
  try {
    let sql = 'SELECT  user_id FROM users WHERE username = $1';
    let query = await client.query(sql, [username]);
    return query.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  deleteUser,
  checkUsername,
  addToken,
  checkUserToken,
  checkUserPassword,
};
