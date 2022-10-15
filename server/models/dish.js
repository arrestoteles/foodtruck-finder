var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema ({
    name: { type: String},
    price: { type: String}
});
module.exports = mongoose.model('dishes', dishSchema);