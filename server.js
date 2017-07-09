
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var seeder = require('mongoose-seed');

var Account = require("./models/Account.js");
var Transaction = require("./models/Transaction.js");

mongoose.Promise = Promise;

// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/financemanager', function() {
 
    // Load Mongoose models 
    seeder.loadModels([
        './models/Account.js',
        './models/Transaction.js'
    ]);
 
    // Clear specified collections 
    // seeder.clearModels(['Account', 'Transaction'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data, function() {
            //seeder.disconnect(); 
        // });
 
    });
});
 
// Data array containing seed data - documents organized by Model 
var data = [
    {
        'model': 'Account',
        'documents': [
            {
                'username': 'Alex',
                'password': 111,
                'bankAmount': 1000,
                'cashAmount': 50
            },
            {
                'username': 'Admin',
                'password': 123,
                'bankAmount': 10,
                'cashAmount': 5
            }
        ]
    }
];

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
  console.log("Mongoose connection successful.");
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");

  Account.find({}, function(err, data){
        console.log(">>>> " + data[0].username );
    });
});
