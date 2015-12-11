var express = require('express');
var util = require('util');
var router = express.Router();
var submissionModel = require('../models/submission');
var validator = require('express-validator');


/* GET home page. */
router.get('/', function(req, res, next) {
 	var response = {};
 	submissionModel.find({}, function(err,data){
 		if (err) {
 			response = {"status" : 400,"response" : "Error fetching data"};
 		} else {
 			response = {"status" : 200,"response" : data};
 		}
 		res.json(response);
 	});
});

router.post('/', function(req, res) {
	var response = {};

	var submission = new submissionModel();

	submission.answer1 = req.body.answer1;
	submission.answer2 = req.body.answer2;
	submission.answer3 = req.body.answer3;
	submission.answer4 = req.body.answer4;
	submission.answer5 = req.body.answer5;
	submission.name = req.body.name;
	submission.email = req.body.email;
	submission.ic = req.body.ic;
	submission.contact = req.body.contact;

	submission.save(function(err) {
		if (err) {
			response = {"status" : 400,"response" : "Error saving data"};
		} else {
			response = {"status" : 200,"response" : "Data saved"};
		}
		res.json(response);
	});

});

module.exports = router;
