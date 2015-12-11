var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var submissionSchema = new Schema({
	"answer1": String,
	"answer2": String,
	"answer3": String,
	"answer4": String,
	"answer5": String,
	"name": String,
	"email": String,
	"ic": String,
	"contact": Number
});

submissionSchema.index({ "$**": "text" }); 

module.exports = mongoose.model('submission',submissionSchema);
