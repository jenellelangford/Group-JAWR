USE light_db;

INSERT INTO users (first_name, last_name, email, user_desc, user_password, user_venmo, user_location)
VALUES ("Rachel", "Murray", "dcbeergoddess@gmail.com", "test", "test", "@dcbeergoddess", "Washington, DC"), 
("William", "Rave", "william@gmail.com", "test", "test", "@test", "Rockville");


INSERT INTO workers (requests, skills, user_id)
VALUES ("website", "drinking", 1);