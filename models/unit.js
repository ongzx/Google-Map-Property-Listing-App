var mongoose = require('mongoose');
require('mongoose-big-decimal')(mongoose);

var Schema = mongoose.Schema;

var unitSchema = new Schema({
	"address" : {
		"block_number" : Number,
		"street_name": String,
		"postal_code": Number,
		"city": String,
		"country" : String
	},
	"loc": {
		"type": [Number],
		"index": "2d"
	},
	"price" : Number,
	"num_rooms" : Number,
	"num_bathrooms" : Number,
	"sqft" : Number
});

module.exports = mongoose.model('units',unitSchema);
