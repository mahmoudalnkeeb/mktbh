-- Create table for books
CREATE TABLE IF NOT EXISTS books (
    book_id SERIAL PRIMARY KEY,
    book_name VARCHAR(200) NOT NULL,
    book_desc TEXT NOT NULL,
    book_author VARCHAR(100) NOT NULL,
    book_category VARCHAR(100) NOT NULL,
    book_image TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for users
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    hashed_pass TEXT NOT NULL,
    salt TEXT NOT NULL,
    access_token TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for user_roles
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT,
    role VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
