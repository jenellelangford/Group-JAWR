USE light_db;

INSERT INTO users (first_name, last_name, email, user_desc, user_password, user_venmo, user_location)
VALUES ("Rachel", "Murray", "dcbeergoddess@gmail.com", "dcbeergoddess", "password", "@dcbeergoddess", "Washington, DC"), 
("William", "Rave", "william@gmail.com", "test", "test", "@test", "Rockville"),
("Nicholas", "Cage","nCage@gmail","Bees!","password","@Bees!","Las Vegas"),
("Gary", "Almes", "Gary@Gary.com","Dammit Dan.","password","venmo","Washington, DC"),
("Jenelle", "Langford", "jenellelangford@gmail.com","test","test","venmo","Virgnia"),
("Dan", "Rosenbaum", "dRosenbaum@gmail.com","You aren't getting any money Gary","password","venmo","Maryland");


INSERT INTO workers (requests, skills, user_id)
VALUES ("website", "drinking", 1),
("Foreign Key explanation","Pyromania", 2),
("Bees!","Bees!", 3);

INSERT INTO coders (speciality, user_id)
VALUES ("Whole-stack Development", 4), ("CSS", 5);

INSERT INTO patrons (user_id)
VALUES (6);