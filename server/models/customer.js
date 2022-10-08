var mongoose = require('mongoose')
var Schema = mongoose.Schema

var customerSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String }
})

module.exports = mongoose.model('customers', customerSchema)
