// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the transaction schema
var TransactionSchema = new Schema({
  type: {
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
  	default: Date.now 
  }
});

var Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
