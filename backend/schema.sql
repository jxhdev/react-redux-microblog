
DROP DATABASE IF EXISTS "rr-microblog-db";

CREATE DATABASE "rr-microblog-db";

\c "rr-microblog-db"
CREATE TABLE posts (id SERIAL PRIMARY KEY, title TEXT, body TEXT, likes INTEGER DEFAULT 0);
CREATE TABLE comments (id SERIAL PRIMARY KEY, text TEXT, post_id INTEGER REFERENCES "posts" (id) ON DELETE CASCADE);

