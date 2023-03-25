CREATE TABLE IF NOT EXISTS books(
    book_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
    book_name VARCHAR(255) NOT NULL,
    lang VARCHAR(100),
    book_desc TEXT NOT NULL,
    book_author VARCHAR NOT NULL,
    book_category VARCHAR NOT NULL,
    book_image TEXT NOT NULL,
    book_image_name TEXT NOT NULL,
    search_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);