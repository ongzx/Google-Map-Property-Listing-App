var mongoose = require('mongoose');
require('mongoose-big-decimal')(mongoose);

var Schema = mongoose.Schema;

var unitSchema = new Schema({
	"address" : {
		"block_number" : Number,
		"street_name": String,
		"postal_code": Number,
		"city": String,
		"country" : String,
		"coordinates": {
			"latitude": Number,
			"longitude": Number
		}
	},
	"price" : Number,
	"num_rooms" : Number,
	"num_bathrooms" : Number,
	"sqft" : Number
});

unitSchema.index({ "$**": "text" }); 

module.exports = mongoose.model('units',unitSchema);
