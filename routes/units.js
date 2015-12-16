var express = require('express');
var util = require('util');
var router = express.Router();
var unitModel = require('../models/unit');
var validator = require('express-validator');

router.get('/', function(req, res) {
	var response = {};
	unitModel.find({}, function(err,data){
		if (err) {
			response = {"status" : 400,"response" : "Error fetching data"};
		} else {
			response = {"status" : 200,"response" : data};
		}
		res.json(response);
	});
});

router.post('/', function(req,res) {
	var response = {};
	var unit = new unitModel();

	req.checkBody({
		'address.block_number' : {
			notEmpty: true,
			isInt : {
				errorMessage: 'Invalid block number'
			},
			errorMessage: 'Missing block number'
		},
		'address.street_name' : {
			notEmpty: true,
			errorMessage: 'Missing street name'
		},
		'address.postal_code' : {
			notEmpty : true,
			isInt: {
				errorMessage: 'Invalid postal code'
			},
			errorMessage: 'Missing postal code'
		},
		'address.city' : {
			notEmpty: true,
			errorMessage: 'Missing city'
		},
		'address.country' : {
			notEmpty: true,
			errorMessage: 'Missing country'
		},
		'price' : {
			notEmpty: true,
			errorMessage: 'Missing price'
		},
		'num_rooms' : {
			notEmpty: true,
			isInt: {
				errorMessage: 'Invalid num of rooms'
			},
			errorMessage: 'Missing number of rooms'
		},
		'num_bathrooms' : {
			notEmpty : true,
			isInt: {
				errorMessage: 'Invalid num of bathrooms'
			},
			errorMessage: 'Missing number of bathrooms'
		},
		'sqft' : {
			notEmpty : true,
			isInt: {
				errorMessage: 'Invalid sqft'
			},
			errorMessage: 'Missing sqft'
		}
	});

	var errors = req.validationErrors();

	if (errors) {
		response = {"status": 400, "response": 'Data errors: ' + util.inspect(errors)};
		res.json(response);
		return;
	} 

	unit.address.block_number = req.body.address.block_number;
	unit.address.street_name = req.body.address.street_name;
	unit.address.postal_code = req.body.address.postal_code;
	unit.address.city = req.body.address.city;
	unit.address.country = req.body.address.country;
	// unit.address.coordinates.latitude = req.body.address.coordinates.latitude;
	// unit.address.coordinates.longitude = req.body.address.coordinates.longitude;
	unit.loc = [ req.body.latitude, req.body.longitude ],
	unit.price = req.body.price;
	unit.num_rooms = req.body.num_rooms;
	unit.num_bathrooms = req.body.num_bathrooms;
	unit.sqft = req.body.sqft;

	unit.save(function(err) {
		if (err) {
			response = {"status" : 400,"response" : "Error saving data"};
		} else {
			response = {"status" : 200,"response" : "Data saved"};
		}
		res.json(response);
	});

});


router.get('/:id', function(req,res) {
	var response = {};

	unitModel.findById(req.params.id, function(err,data) {
		if (err) {
			response = {'status': 400, "response" : "Error fetching data"};
		} else {
			response = {"status": 200, "response":data};
		}

		res.json(response);
	});
});

router.delete('/:id', function(req,res) {
	var response = {};
	unitModel.findById(req.params.id, function(err,data){
		if (err) {
			response = {"status": 400, "response": "Error fetching data"};
		} else {
			unitModel.remove({_id : req.params.id}, function(err) {
				if (err) {
					response = {"status": 400, "response": "Error deleting data"};
				} else {
					response = {"status": 200, "response": "Data associated with id " + req.params.id +" is removed."};
				}
				res.json(response);
			});
		}

	});
});

router.post('/search', function(req, res) {

	var re = new RegExp(req.query.q, 'i');

	var response = {};

	unitModel.find().or([
		{"address.city": {"$regex": re}}, 
		{"address.country": {"$regex": re}}, 
		{"address.street_name": {"$regex": re}}
	]).exec(function(err, data) {
		if (err) {
			response = {"status": 400, "response": "Error fetching data"};
		} else {

			response = {"status": 200, "response": data};
		}
		res.json(response);
	});
});

router.post('/find', function(req, res) {
	var limit = req.query.limit || 10;

	var radius = req.query.radius /10;

	console.log(radius);

	var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;


	unitModel.find({
      loc: {
        $geoWithin: {
        	$center: [ coords, radius ]
        }
      }
    }).limit(limit).exec(function(err, data) {
      	if (err) {
			response = {"status": 400, "response": "Error fetching data"};
		} else {

			response = {"status": 200, "response": data};
		}
      	res.json(response);
    });
});


module.exports = router;
