var mongoose = require('mongoose')
var Schema = mongoose.Schema

var customerSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password: { type: String },
  foodtrucks: { type: Schema.Types.ObjectId, ref: 'foodtrucks' },
  token: { type: String }
})

module.exports = mongoose.model('customers', customerSchema)
