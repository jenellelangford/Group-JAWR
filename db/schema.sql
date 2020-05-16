DROP DATABASE IF EXISTS light_db;
CREATE DATABASE light_db;

USE light_db;

CREATE TABLE users (
  id INTEGER AUTO_INCREMENT NOT NULL,
  avatar_src VARCHAR(40),
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  email VARCHAR(40),
  user_desc TEXT,
  user_password VARCHAR(30),
  user_venmo VARCHAR(30),
  user_location VARCHAR(30)
)

CREATE TABLE workers (
  worker_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  id INTEGER NOT NULL,
  requests TEXT,
  skills TEXT
);

CREATE TABLE patrons (
  patron_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  id INTEGER NOT NULL,
);

CREATE TABLE coders (
  coder_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  id INTEGER NOT NULL,
  speciality VARCHAR(40),
  skills TEXT
);