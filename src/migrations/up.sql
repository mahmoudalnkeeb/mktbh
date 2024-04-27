CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50),
    password VARCHAR NOT NULL,
    salt VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books(
    book_id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    cover_image VARCHAR,
    description TEXT,
    language VARCHAR,
    added_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects(
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS authors(
    author_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    image VARCHAR,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS author_books(
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES authors(author_id),
    book_id INTEGER REFERENCES books(book_id)
);

CREATE TABLE IF NOT EXISTS ratings(
    rating_id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(book_id),
    user_id INTEGER REFERENCES users(user_id),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5), -- Constraint for rating between 1 and 5
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS book_subjects(
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(book_id),
    subject_id INTEGER REFERENCES subjects(subject_id)
);

-- Adding indexes for foreign key columns
CREATE INDEX ON books(added_by);
CREATE INDEX ON author_books(author_id);
CREATE INDEX ON author_books(book_id);
CREATE INDEX ON ratings(book_id);
CREATE INDEX ON ratings(user_id);
CREATE INDEX ON book_subjects(book_id);
CREATE INDEX ON book_subjects(subject_id);
