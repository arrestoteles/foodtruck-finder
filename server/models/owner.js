var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ownerSchema = new Schema({
  username: { type: String },
  password: { type: String }
})

module.exports = mongoose.model('owners', ownerSchema)
