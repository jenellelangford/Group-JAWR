DROP DATABASE IF EXISTS name_DB;
CREATE DATABASE nameDB;

USE nameDB;

CREATE TABLE tables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item VARCHAR(100) NULL,
  category VARCHAR(45) NULL,
  starting_num INT default 0,
  price DECIMAL(10,2) NULL,
  quantity INT NULL
);