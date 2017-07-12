// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

var AllAcountsSchema = new Schema({
  // name: a unique string
  name: {
    type: String,
    unique: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});

var AllAcounts = mongoose.model("AllAcounts", AllAcountsSchema);


module.exports = AllAcounts;
