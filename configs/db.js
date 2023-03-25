const { Pool } = require('pg');
const { dbUser, dbPass, dbHost, dbPort, dbName, ssl } = require('./env');

let pool = new Pool({
  user: dbUser,
  password: dbPass,
  host: dbHost,
  port: dbPort,
  database: dbName,
  max: 20,
  idleTimeoutMillis: 10000,
  maxUses: 7500,
  ssl: ssl,
});

module.exports = pool;
