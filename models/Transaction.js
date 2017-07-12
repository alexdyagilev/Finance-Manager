// Require mongoose
var mongoose = require("mongoose");
var moment = require("moment");
// Create a schema class
var Schema = mongoose.Schema;

var current = moment().format("l");
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
  	type: Date, 
  	default: current
  }
});

var Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
