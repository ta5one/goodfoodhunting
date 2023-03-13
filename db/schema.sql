CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE-550x550.jpg');
INSERT INTO dishes (title, image_url) VALUES ('pudding', 'https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE-550x550.jpg');
INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://handletheheat.com/wp-content/uploads/2021/12/peppermint-chocolate-cake-SQUARE-550x550.jpg');

-- INSERT INTO users (email) VALUES ('dt@ga.co');
-- INSERT INTO users (email) VALUES ('dt@generalassemb.ly');

ALTER TABLE dishes ADD COLUMN user_id INTEGER;

