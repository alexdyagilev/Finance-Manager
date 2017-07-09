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
    required: true
  },
  cashAmount: {
    type: Number,
    required: true
  }
},
{collection: 'accounts'}
);

var Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
