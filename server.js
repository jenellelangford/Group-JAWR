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

// ROUTES PSEUDO CODE FOR server.js
// GET/RENDER HOMEPAGE | INDEX.HANDLEBARS | LOGIN PAGE
app.get("/",function(req,res){
  res.render("index",null);
});
// GET/RENDER WORKER PAGE | WORKER HANDLEBARS
app.get("/workers",function(req,res){
  connection.query("SELECT * FROM users INNER JOIN workers ON id = user_id",function(err, resQuery){
    workers = {
      workerArray: resQuery
    };
    res.render("workerpage",workers);
  });
});
// GET/RENDER CODER PAGE | CODER HANDLEBARS
app.get("/coderpage",function(req,res){
  connection.query("SELECT * FROM users INNER JOIN coders ON id = user_id", function(err,resQuery){
    coders = {
      coderArray: resQuery
    };
    res.render("coderpage", coders);
  });
});
// POST/CREATE NEW WORKER ("api/workers")
app.post("api/workers",function(req,res){
  userData = {
    first_name = req.body.first_name,
    last_name = req.body.last_name,
    email = req.body.email,
    user_desc = req.body.desc,
    password = req.body.password,
    venmo = req.body.venmo,
    location = req.body.location,
  };//Common 
  workerData = {
    skills = req.body.skills,
    link = req.body.link
  };
  connection.query(`INSERT INTO users (${userQuery}) VALUES(?)`,[Object.values(userData)],function(err,resQueryUser){
    if(err) throw err;
    //get the ID of that new object
    connection.query(`INSERT INTO workers (user_id, skills, personal_link) VALUES(?)`, [id,workerData.skills,workerData.link],function(err,resQueryWorker){
      res.redirect("/workerpage");
    });
  });
});
// POST/CREATE NEW CODER ("api/coders")
// POST/CREATE NEW PATRON ("api/patrons")
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