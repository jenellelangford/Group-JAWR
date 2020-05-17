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
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// ROUTES
    //DO WE WANT TO PUT THESE IN A SEPERATE CONTROLLER FOLDER

// BUILD OUT DUMMY ROUTES 




//LISTEN    
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});