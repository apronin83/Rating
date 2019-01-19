var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  points: [{
    name: String
  }]
});

var Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
