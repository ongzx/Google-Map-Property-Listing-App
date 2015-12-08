var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	"email" : String,
	"first_name" : String,
	"last_name" : String
});

module.exports = mongoose.model('users',userSchema);
