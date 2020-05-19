USE light_db;

INSERT INTO users (avatar_src, first_name, last_name, email, user_desc, user_password, user_venmo, user_location)
VALUES ("https://avatars0.githubusercontent.com/u/59098488?v=4&s=200", "Rachel", "Murray", "dcbeergoddess@gmail.com", "dcbeergoddess", "password", "@dcbeergoddess", "Washington, DC"), 
("https://avatars0.githubusercontent.com/u/47487767?v=4&s=200", "William", "Rave", "william@gmail.com", "test", "test", "@test", "Rockville"),
("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxFTfDWP1_UzRnpPSdI4Ue5ZZ-0uHLAuiJt-w5YtNjM2VMcZW0&usqp=CAU/200x200","Nicholas", "Cage","nCage@gmail","Bees!","password","@Bees!","Las Vegas"),
("https://avatars3.githubusercontent.com/u/444729?v=4&s=200","Gary", "Almes", "Gary@Gary.com","Dammit Dan.","password","venmo","Maryland"),
("https://avatars0.githubusercontent.com/u/60627197?v=4&s=200", "Jenelle", "Langford", "jenellelangford@gmail.com","test","test","venmo","Virgnia"),
("https://avatars2.githubusercontent.com/u/50913521?v=4&s=200","Dan", "Rosenbaum", "dRosenbaum@gmail.com","You aren't getting any money Gary","password","venmo","Virignia");


INSERT INTO workers (requests, skills, user_id)
VALUES ("website", "drinking", 1),
("Foreign Key explanation","Pyromania", 2),
("Bees!","Bees!", 3);

INSERT INTO coders (speciality, tech_skills, github, user_id)
VALUES ("Web Development", "Full-Stack", "garytalmes", 4), ("Web Development", "CSS", "jenellelangford", 5);

INSERT INTO patrons (user_id)
VALUES (6);