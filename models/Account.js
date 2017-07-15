// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create account schema
var AccountSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bankAmount: {
    type: Number,
    default: 0
  },
  cashAmount: {
    type: Number,
    default: 0
  }
});

var Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
