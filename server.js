// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql")
const config = require("./config/db")

// Create an instance of the express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//by default use local settings
const dbCreds = (process.env.NODE_ENV === "production") ? config.production : config.db;
//change if in production

const connection = mysql.createConnection(dbCreds);
//const connection = mysql.createConnection({host: "localhost", user: "root", password: "hello1234",database: "wishes_db"});
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

const userQuery = "first_name, last_name, email, user_desc, user_password, user_venmo, user_location";

//==============ROUTES=============

// GET/RENDER HOMEPAGE | INDEX.HANDLEBARS | LOGIN PAGE
app.get("/",function(req,res){
  res.render("index", null);
});

// GET/RENDER INPUT FORM | CREATE PROFILE

app.get("/createprofile",function(req,res){
    res.render("inputform", null);
});

app.get("/users/:id",function(req,res){
    const userId = req.params.id;
    connection.query(`SELECT * FROM users WHERE id = ${userId}`, function(err,resQuery){
      if(err) throw err;
      res.render("profilepage", {user:resQuery[0]});
    });
});

// GET/RENDER WORKER PAGE | WORKER HANDLEBARS
app.get("/workers",function(req,res){
  connection.query("SELECT * FROM workers INNER JOIN users ON workers.user_id = users.id",function(err, resQuery){
    if (err) throw err;
    // const workers = {
    //   workerArray: resQuery
    // };
    res.render("workerpage", { workers:resQuery} );
  });
});

// GET/RENDER CODER PAGE | CODER HANDLEBARS
app.get("/coders",function(req,res){
  connection.query("SELECT * FROM coders INNER JOIN users ON coders.user_id = users.id", function(err,resQuery){
    if (err) throw err;
    // coders = {
    //   coderArray: resQuery
    // };
    res.render("coderpage", { coders:resQuery } );
  });
});

// POST/CREATE NEW WORKER ("api/workers")
// app.post("api/workers",function(req,res){
//   userData = {
//     first_name = req.body.first_name,
//     last_name = req.body.last_name,
//     email = req.body.email,
//     user_desc = req.body.desc,
//     password = req.body.password,
//     venmo = req.body.venmo,
//     location = req.body.location,
//   };//Common 
//   workerData = {
//     skills = req.body.skills,
//     link = req.body.link
//   };
//   connection.query(`INSERT INTO users (${userQuery}) VALUES(?)`,[Object.values(userData)],function(err,resQueryUser){
//     if(err) throw err;
//     //get the ID of that new object
//     connection.query(`INSERT INTO workers (user_id, skills, personal_link) VALUES(?)`, [id,workerData.skills,workerData.link],function(err,resQueryWorker){
//       res.redirect("/workerpage");
//     });
//   });
// });

// Create a NEW CODER
app.post("/api/coders", function(req, res) {
  connection.query("INSERT INTO users (avatar_src, first_name, last_name, email, user_desc, user_password, user_venmo, user_location) VALUES (?)", [req.body.avatar_src, req.body.first_name, req.body.last_name, req.body.email, req.body.user_desc, req.body.user_password, req.body.user_venmo, req.body.user_location], function(err, res) {
    if (err) throw err; 
  });
  connection.query("INSERT INTO coders (speciality, tech_skills, github, user_id) VALUES (?)", [req.body.speciality, req.body.tech_skills, req.body.github, req.body.user_id], function(err, result) {
    if (err) throw err; 
  });
  res.redirect("/coderpage");
});

//Create NEW WORKER
app.post("/api/workers", function(req, res) {
  connection.query("INSERT INTO user (avatar_src, first_name, last_name, email, user_desc, user_password, user_venmo, user_location) VALUES (?)", [req.body.avatar_src, req.body.first_name, req.body.last_name, req.body.email, req.body.user_des, req.body.user_pasword, req.body.user_venmo, req.body.user_location], function(err, res) {
    if (err) throw err; 
  });
  connection.query("INSERT INTO workers (requests, skills, personal_link, user_id) VALUES (?)", [req.body.requests, req.body.skills, req.body.personal_link, req.body.user_id], function(err, result) {
    if (err) throw err; 
  });
  res.redirect("/workerpage");
});

//Create NEW PATRON
app.post("/api/patrons", function(req, res) {
  connection.query("INSERT INTO user (avatar_src, first_name, last_name, email, user_desc, user_password, user_venmo, user_location) VALUES (?)", [req.body.avatar_src, req.body.first_name, req.body.last_name, req.body.email, req.body.user_des, req.body.user_pasword, req.body.user_venmo, req.body.user_location], function(err, res) {
    if (err) throw err; 
  });
  connection.query("INSERT INTO patrons (user_id) VALUES (?)", [req.body.user_id], function(err, result) {
    if (err) throw err; 
  });
  res.redirect("/workerpage");
});

// UPDATE WORKER ("api/workers/:id")
// UPDATE CODER ("api/coders:id")
// UPDATE PATRON ("api/patrons:id") 
// DELETE WORKER ("api/workers/:id")
// DELETE CODER ("api/coders:id")
// DELETE PATRON ("api/patrons:id") 




//LISTEN    
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});