const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret, rounds } = require('../configs/env');

function createJwt(payload, exp) {
  try {
    return { token: jwt.sign(payload, jwtSecret, { expiresIn: exp }) };
  } catch (error) {
    throw error;
  }
}

function hash(data) {
  try {
    let salt = bcrypt.genSaltSync(rounds);
    let hashed = bcrypt.hashSync(data + salt, rounds);
    return { salt, hashed };
  } catch (error) {
    throw error;
  }
}

function compare(string, salt, hash) {
  try {
    return bcrypt.compareSync(string + salt, hash);
  } catch (error) {
    throw error;
  }
}

function decodeJwt(token) {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw error;
  }
}

function verfiyJwt(token) {
  try {
    if (!jwt.verify(token, jwtSecret)) return false;
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw error;
  }
}

module.exports = { createJwt, hash, compare, decodeJwt, verfiyJwt };
