'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('myApp')
  .controller('MainCtrl', function ($scope,apiService,$routeParams) {

    $scope.properties = [];

    $scope.search_value = "";

    var center_lat = 1.2818928032621093;
    var center_log = 103.79616599999997;
    var default_radius = 600;

    var radius_value = 0;

    $scope.map = { center: { latitude: center_lat, longitude:center_log }, zoom: 14 };

    $scope.circle = {
        id: 1,
        center: {
            latitude: center_lat,
            longitude: center_log
        },
        radius: default_radius,
        stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
        },
        fill: {
            color: '#08B21F',
            opacity: 0.5
        },
        geodesic: true, // optional: defaults to false
        draggable: true, // optional: defaults to false
        clickable: false, // optional: defaults to true
        editable: true, // optional: defaults to false
        visible: true, // optional: defaults to true
        control: {}
    };

    $scope.init = function() {

    	// var final_radius = 0;

    	// if (radius_value != 0) {
    	// 	final_radius = radius_value;
    	// } else {
    	// 	final_radius = default_radius;
    	// }

    	apiService.findPropertyByCoord(default_radius, center_log, center_lat)
	    	.success(function(data){
	    		$scope.properties = data.response;
	    		angular.forEach($scope.properties, function(v,k) {
	    			v.coords = {};
	    			v.coords.latitude = v.loc[0];
	    			v.coords.longitude = v.loc[1];
	    		});
	    	})
	    	.error(function(err){
	    		console.log(err);
	    	});
    }

  	$scope.marker_event = {
  		click : function(marker, eventName, args) {
  			alert("clicked");
  			console.log(marker);
  		}
  	}

  	var metersToMiles = function(meters) {
  		return meters * 0.000621371192;
  	} 

  	$scope.circle_event = {
  		center_changed: function(circle, eventName, model ,args) {
  			console.log("center changed");
  			center_lat = circle.getCenter().lat();
  			center_log = circle.getCenter().lng();
  			$scope.init();
  		}, 
  		radius_changed : function(circle, eventName, model ,args) {
  			console.log("radius changed");

  			default_radius = circle.getRadius(); 
  			radius_value = Math.round(metersToMiles(default_radius) * 10) / 10;	
  			$scope.init();
  		}
  	}

  	$scope.searchProp = function() {
  		apiService.searchProp($scope.search_value)
  			.success(function(data) {
  				$scope.properties = data.response;
  			})
  			.error(function(error) {
  				console.log(error);
  			});
  	}

  	$scope.init();

  });
