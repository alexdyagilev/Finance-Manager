
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var seeder = require('mongoose-seed');
var moment = require('moment');

var Account = require("./models/Account.js");
var AllAcounts = require("./models/AllAcounts.js");
var Transaction = require("./models/Transaction.js");
var AllTransactions = require("./models/AllTransactions.js");

mongoose.Promise = Promise;

//MONGOOSE SEEDER START
// Connect to MongoDB via Mongoose 

// Data array containing seed data - documents organized by Model 
// var data = [
//     {
//         'model': 'Account',
//         'documents': [
//             {
//                 'username': 'Alex',
//                 'password': 111,
//                 'bankAmount': 1000,
//                 'cashAmount': 50
//             },
//             {
//                 'username': 'Admin',
//                 'password': 123,
//                 'bankAmount': 10,
//                 'cashAmount': 5
//             }
//         ]
//     }
// ];
//END


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

// var setAccount = new Account({
//   username: "Alex",
//   password: "111",
//   bankAmount: 2000,
//   cashAmount: 100
// });
// // Using the save method in mongoose, we create our account in the db
// setAccount.save(function(error, doc) {
//   // Log any errors
//   if (error) {
//     console.log(error);
//   }
//   // Or log the doc
//   else {
//     console.log("Alex account set : " + doc);
//   }
// });

// var tList = new AllTransactions({
//   name: "List of changes"
// });
// // Using the save method in mongoose, we create our example library in the db
// tList.save(function(error, doc) {
//   // Log any errors
//   if (error) {
//     console.log(error);
//   }
//   // Or log the doc
//   else {
//     console.log(doc);
//   }
// });

app.post("/newaccount", function(req,res){

  var newA = new Account(req.body);
  
  newA.save();
});

// var AllT = new AllTransactions();

app.post("/submit", function(req, res) {

  var newT = new Transaction(req.body);

// Save the new transaction in the transaction collection
  newT.save();
  // newT.save(function(err, doc) {
  //   // Send an error to the browser if there's something wrong
  //   if (err) {
  //     res.send(err);
  //   }
  //   else {
  //     AllTransactions.findOneAndUpdate({}, { $push: { "changes": doc._id } }, { new: true }, function(error, doc) {
  //       // Send any errors to the browser
  //       if (error) {
  //         res.send(error);
  //       }
  //       // Or send the doc to the browser
  //       else {
  //         res.send(doc);
  //       }
  //     });
  //   }
  // });
});

app.get("/data", function(req, res) {
  // Using our Book model, "find" every book in our book db
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

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");

  // Transaction.find({}, function(err, data){
  //       console.log(">>>> " + data[0].amount );

//         seeder.connect('mongodb://localhost/financemanager', function() {
 
//     // Load Mongoose models 
//     seeder.loadModels([
//         './models/Account.js',
//         './models/Transaction.js',
//         './models/AllTransactions.js'
//     ]);
 
//     // Clear specified collections 
//     seeder.clearModels(['Account', 'Transaction', 'AllTransactions'], function() {
 
//     });
// });
});
// });
