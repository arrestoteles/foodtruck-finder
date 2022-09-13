var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  username: { type: String },
  password: { type: Number },
});

module.exports = mongoose.model("customers", customerSchema);
