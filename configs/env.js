require('dotenv').config();

let env =
  process.env.ENV == 'dev'
    ? {
        port: 4000,
        dbName: process.env.DB_NAME_DEV,
        dbUser: process.env.DB_USER_DEV,
        dbPass: process.env.DB_PASS_DEV,
        dbHost: process.env.DB_HOST_DEV,
        dbPort: process.env.DB_PORT_DEV,
        ssl: null,
        origins: process.env.CORS_ORIGINS_DEV,
        jwtSecret: process.env.JWT_SECRET,
        rounds: parseInt(process.env.ROUNDS),
        sessionSecret: process.env.SESSION_SECRET
      }
    : {
        port: process.env.PORT,
        dbName: process.env.DB_NAME,
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS,
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        ssl: process.env.SSL,
        origins: process.env.CORS_ORIGINS,
        jwtSecret: process.env.JWT_SECRET,
        rounds: parseInt(process.env.ROUNDS),
        sessionSecret: process.env.SESSION_SECRET
      };

module.exports = env;
