var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ownerSchema = new Schema({
  username: { type: String },
  password: { type: String },
  foodtrucks: [{ type: Schema.Types.ObjectId, ref: 'foodtrucks' }]
})

module.exports = mongoose.model('owners', ownerSchema)
