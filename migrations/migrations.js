const migrations = {
  books: {
    up: `
    CREATE TABLE IF NOT EXISTS books(
      book_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
      book_name VARCHAR(200) NOT NULL,
      book_desc TEXT NOT NULL,
      book_author VARCHAR NOT NULL,
      book_category VARCHAR NOT NULL,
      book_image TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`,
    down: `DROP TABLE IF EXISTS books;`,
  },
  users: {
    up: `
    CREATE TABLE IF NOT EXISTS users(
      user_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
      username VARCHAR(16) UNIQUE NOT NULL,
      email VARCHAR(200) NOT NULL,
      hashed_pass TEXT NOT NULL,
      salt TEXT NOT NULL,
      access_token TEXT UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`,
    down: `DROP TABLE IF EXISTS users CASCADE;`,
  },
  roles: {
    up: `
    CREATE TABLE IF NOT EXISTS roles(
      role_id VARCHAR(16) NOT NULL UNIQUE,
      role_name VARCHAR(32) NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`,
    down: `DROP TABLE IF EXISTS roles CASCADE;`,
  },
  permissions: {
    up: `
    CREATE TABLE IF NOT EXISTS permissions(
      permission_id VARCHAR(16) NOT NULL UNIQUE,
      permission_name VARCHAR(32) NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`,
    down: `DROP TABLE IF EXISTS permissions CASCADE;`,
  },
  role_permissions: {
    up: `
    CREATE TABLE IF NOT EXISTS role_permissions(
      id VARCHAR(16) NOT NULL UNIQUE,
      permission_id VARCHAR(16) NOT NULL UNIQUE,
      role_id VARCHAR(16) NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
      FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) ON DELETE CASCADE
  );`,
    down: `DROP TABLE IF EXISTS role_permissions CASCADE;`,
  },
  user_roles: {
    up: `
    CREATE TABLE IF NOT EXISTS user_roles(
      id VARCHAR(16) NOT NULL UNIQUE,
      user_id VARCHAR(16) NOT NULL UNIQUE,
      role_id VARCHAR(16) NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
  );`,
    down: `DROP TABLE IF EXISTS user_roles CASCADE;`,
  },
};

module.exports = migrations;
