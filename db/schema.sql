DROP DATABASE IF EXISTS light_db;
CREATE DATABASE light_db;

USE light_db;

CREATE TABLE users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  avatar_src VARCHAR(1000),
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  email VARCHAR(40),
  user_desc TEXT,
  user_password VARCHAR(30),
  user_venmo VARCHAR(30),
  user_location VARCHAR(30),
  user_youtube VARCHAR(60),
  user_reference TEXT,
  user_moreinfo TEXT
);

CREATE TABLE workers (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 requests TEXT,
 skills TEXT,
 personal_link VARCHAR (40),
 user_id INT,
   FOREIGN KEY (user_id)
     REFERENCES users(id)
);

CREATE TABLE patrons (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
   FOREIGN KEY (user_id)
     REFERENCES users(id)
);

CREATE TABLE coders (
   id INTEGER AUTO_INCREMENT PRIMARY KEY,
   speciality VARCHAR(40),
   tech_skills TEXT,
   github VARCHAR(40),
   user_id INT,
   FOREIGN KEY (user_id)
       REFERENCES users (id)
);