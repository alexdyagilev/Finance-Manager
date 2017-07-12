// Require mongoose
var mongoose = require("mongoose");
var moment = require("moment");
// Create a schema class
var Schema = mongoose.Schema;

var current = moment().format("l");
// Create the transaction schema
var AllTransactionsSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  changes: [{
    type: Schema.Types.ObjectId,
    ref: "Transaction"
  }]
});

var AllTransactions = mongoose.model("AllTransactions", AllTransactionsSchema);

module.exports = AllTransactions;
