var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var foodtruckSchema = new Schema ({
    name: { type: String },
    category: { type: String },
    dishes: { type: Schema.Types.ObjectId, ref: 'dishes' },
});


module.exports = mongoose.model( 'foodtrucks', foodtruckSchema );
