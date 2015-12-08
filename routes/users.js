var express = require('express');
var util = require('util');
var router = express.Router();
var userModel = require('../models/user');
var validator = require('express-validator');


/* GET users listing. */
router.get('/', function(req, res, next) {
  	var response = {};
	userModel.find({},function(err,data){
	    if(err) {
	        response = {"error" : true,"message" : "Error fetching data"};
	    } else {
	        response = {"error" : false,"message" : data};
	    }
	    res.json(response);
	});
});

router.post('/', function(req, res) {
	var user = new userModel();
	var response = {};

	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
	req.checkBody('first_name', 'Missing first name').notEmpty();
	req.checkBody('last_name', 'Missing last name').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		response = {"status": 400, "message": 'Data errors: ' + util.inspect(errors)};
		res.json(response);
		return;
	} 

	user.email = req.body.email;
	user.first_name = req.body.first_name;
	user.last_name = req.body.last_name;

	user.save(function(err) {
		if (err) {
			response = {"status": 400, "message": "Error adding data"};
		} else {
			response = {"status": 200, "message": "Data added"};
		}

		res.json(response);
	});

});

router.get('/:id', function(req, res) {
	var response = {};
	userModel.findById(req.params.id, function(err, data){
		if (err) {
			response = {"status": 400, "message": "Error fetching data"};
		} else {
			response = {"status": 200, "message":data};
		}

		res.json(response);
	});
});


router.put('/:id', function(req,res) {
	var response = {};
	userModel.findById(req.params.id, function(err,data) {
		if (err) {
			response = {"status": 400, "message": "Error fetching data"};
		} else {
			req.checkBody('email', 'Invalid email').notEmpty().isEmail();
			req.checkBody('first_name', 'Invalid first name').notEmpty();
			req.checkBody('last_name', 'Invalid last name').notEmpty();

			var errors = req.validationErrors();

			if (errors) {
				response = {"status": 400, "message": 'Data errors: ' + util.inspect(errors)};
				res.json(response);
				return;
			}	

			data.email = req.body.email;
			data.first_name = req.body.first_name;
			data.last_name = req.body.last_name;

			data.save(function(err) {
				if (err) {
					response = {"status": 400, "message": "Error updating data"};
				} else {
					response = {"status": 200, "message": "Data is updated for "+req.params.id};
				}
				res.json(response);
			})
		}
	});
});

router.delete('/:id', function(req,res) {
	var response = {};
	userModel.findById(req.params.id, function(err,data){
		if (err) {
			response = {"status": 400, "message": "Error fetching data"};
		} else {
			userModel.remove({_id : req.params.id}, function(err) {
				if (err) {
					response = {"status": 400, "message": "Error deleting data"};
				} else {
					response = {"status": 200, "message": "Data associated with id " + req.params.id +" is removed."};
				}
				res.json(response);
			});
		}

	});
});

module.exports = router;
