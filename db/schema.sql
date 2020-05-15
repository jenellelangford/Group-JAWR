DROP DATABASE IF EXISTS light_db;
CREATE DATABASE light_db;

USE light_db;

CREATE TABLE workers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  username VARCHAR(40),
  user_password VARCHAR(40),
  email VARCHAR(40),
  user_desc TEXT,
  photo_src TEXT 
);