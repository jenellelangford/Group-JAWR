// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql")
const config = require("./config/db")
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/assets/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }

});

const upload = multer({storage: storage});

// Create an instance of the express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
app.use(express.static('config'));
app.use(express.static('public/assets/uploads'))

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.use(express.static(__dirname + '/js'));
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + 'public'));

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

// wip
// app.get("/createprofile",function(req,res){
//     res.sendFile(path.join(__dirname + '/inputforms.h'))
// });

// original code 
app.get("/createprofile",function(req,res){
  res.render("inputform", null);
});

// GET/RENDER WORKER PAGE | WORKER HANDLEBARS
app.get("/workers",function(req,res){
  connection.query("SELECT * FROM workers INNER JOIN users ON workers.user_id = users.id",function(err, resQuery){
    if (err) throw err;
    // const workers = {
    //   workerArray: resQuery
    // };
    res.render("workerpage", { workers:resQuery } );
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

app.post("/createprofile", upload.single('avatar_src'), function(req, res) {
  let avatarpath = req.file.filename;
  connection.query("INSERT INTO users (avatar_src, first_name, last_name, email, user_desc, user_password, user_venmo, user_location, user_reference, user_moreinfo) VALUES (?)", [[avatarpath, req.body.first_name, req.body.last_name, req.body.email, req.body.user_desc, req.body.user_password, req.body.user_venmo, req.body.user_location, req.body.user_reference, req.body.user_moreinfo]], function(err, result) {
    if (err) {throw err;} 
      var user_id = result.insertId;
      // Post to workers table, if new user selects worker
  if(req.body.usertype == "worker") {
    connection.query("INSERT INTO workers (skills, personal_link, requests, user_id) VALUES (?)", [[req.body.skills, req.body.personal_link, req.body.requests, user_id]], function(err, result) {
     if (err) throw err;
    });
    res.redirect("/workers");
   }
   // Post to coders table, if new user selects coder
   else if(req.body.usertype == "coder") {
     connection.query("INSERT INTO coders (speciality, tech_skills, github, user_id) VALUES (?)", [[req.body.speciality, req.body.tech_skills, req.body.github, user_id]], function(err, result) {
      if (err) throw err;
     });
     res.redirect("/coders");
    }
   // Post to patrons/donor table, if yadda yadda
   else if(req.body.usertype == "patron") {
     connection.query("INSERT INTO patrons (user_id) VALUES (?)", [[user_id]], function(err, result) {
      if (err) throw err;
     });
     res.redirect("/patrons");
    }
   else {
     res.redirect("/");
   }
  });
  
});





// Create a new coder
app.post("/api/coders", function(req, res) {
  connection.query("INSERT INTO users (first_name, last_name) VALUES (?)", [req.body.user], function(err, res) {
    if (err) throw err; 
  });
  connection.query("INSERT INTO coders (coder) VALUES (?)", [req.body.coders], function(err, res) {
    if (err) throw err; 
  });
  
});

// // Update an tables example
// app.put("/api/plans/:id", function(req, res) {
//   connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.params.id], function(err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.changedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();

//   });
// });

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

// server.route({
//   method: 'GET',
//   path: '/{filename*}',
//   handler: {
//     directory: {
//       path:    __dirname + '/public',
//       listing: false,
//       index:   false
//     }
//   }
// });

// server.route({
//   method: 'GET',
//   path: '/',
//   handler: function(request, reply) {
//     reply.view('homepage');
//   }
// });