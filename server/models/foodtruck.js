var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var foodtruckSchema = new Schema ({
    name: { type: String },
    color: { type: String },
});

module.exports = mongoose.model( 'foodtrucks', foodtruckSchema );
