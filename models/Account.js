//------------------------------------------------------------------------------
//                FINANCIAL MANAGER v1.0
//------------------------------------------------------------------------------
//                  by Alex Dyagilev
//------------------------------------------------------------------------------
//                      Account.js -- model for accounts
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

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
  }
});

var Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
