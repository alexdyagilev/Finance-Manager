//------------------------------------------------------------------------------
//                FINANCIAL MANAGER v1.0
//------------------------------------------------------------------------------
//                  by Alex Dyagilev
//------------------------------------------------------------------------------
//                      server.js
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var seeder = require('mongoose-seed');
var moment = require('moment');

// Models
var Account = require("./models/Account.js");
var Transaction = require("./models/Transaction.js");

mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/financemanager");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful!");
});

// POST ROUTE --> ADD new ACCOUNTS to DB (NOT WORKING AT THE MOMENT)
app.post("/newaccount", function(req,res){
  var newA = new Account(req.body);
  // Save the new account in the accounts collection
  newA.save();
});

// POST ROUTE --> ADD new TRANSACTIONS to DB
app.post("/submit", function(req, res) {
  var newT = new Transaction(req.body);
// Save the new transaction in the transactions collection
  newT.save();
});

//GET ROUTE --> Returns DATA from TRANSACTION DB
app.get("/data", function(req, res) {
  // Using the Transaction model, "find" every change in DB
  Transaction.find({}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});

//GET ROUTE --> Returns DATA from ACCOUNT DB
app.get("/account", function(req, res) {
  // Using the Transaction model, "find" every change in DB
  Account.find({}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("---------------------------------------------");
  console.log("App running on port 3000!");
  console.log("---------------------------------------------");
  console.log("Open browser and go to URL --> localhost:3000");
  console.log("---------------------------------------------");

//-----------MONGOOSE SEEDER-----DELETE DB OPTION----START------------------------------
// Transaction.find({}, function(err, data){
//    seeder.connect('mongodb://localhost/financemanager', function() {
//           // --- Load Mongoose models-------------
//    seeder.loadModels([
//         './models/Account.js',
//         './models/Transaction.js',
//     ]);
//           // --- Clear specified collections---------
//     seeder.clearModels(['Account', 'Transaction'], function() {
//     });
// });
//-----------MONGOOSE SEEDER-----DELETE DB OPTION----END----------------------------------
});
