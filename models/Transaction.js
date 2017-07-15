// Require mongoose
var mongoose = require("mongoose");
var moment = require("moment");
// Create a schema class
var Schema = mongoose.Schema;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
var current = monthNames[(new Date().getMonth())] + ' ' + new Date().getDate() + ' ' + (new Date().getYear() + 1900);

// Create the transaction schema
var TransactionSchema = new Schema({
  cardOrCash: {
    type: String
  },
  description: {
    type: String
  },
  amount: {
    type: Number
  },
  date: { 
  	type: String, 
  	default: current
  },
  category: {
    type: String
  }
});

var Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
