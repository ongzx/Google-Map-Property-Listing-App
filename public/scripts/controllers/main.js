'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('myApp')
  .controller('MainCtrl', function ($scope,apiService) {

    $scope.properties = [];

    $scope.isLocationChanged = false;

    $scope.circle = 
	    {
	        id: 1,
	        center: {
	            latitude: 1.280005,
	            longitude: 103.796166
	        },
	        radius: 600,
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

    apiService.getProperty()
    	.success(function(data){
    		$scope.properties = data.response;
    	})
    	.error(function(err){
    		console.log(error);
    	});

    $scope.map = { center: { latitude: 1.280005, longitude:103.796166 }, zoom: 14 };

   //  if(navigator.geolocation) {
	  //   navigator.geolocation.getCurrentPosition(function(position) {
	  //     $scope.map.center.latitude = position.coords.latitude;
	  //     $scope.map.center.longitude = position.coords.longitude;
	  //     $scope.isLocationChanged = true;
	  //   });
  	// }

  	$scope.marker_event = {
  		click : function(marker, eventName, args) {
  			alert("clicked");
  			console.log(marker);
  		}
  	}

  	$scope.circle_event = {
  		center_changed: function(circle, eventName, model ,args) {
  			console.log("center changed");
  			console.log(circle.getCenter().toString());
  		}, 
  		radius_changed : function(circle, eventName, model ,args) {
  			console.log("radius changed");
  			console.log(circle.getRadius());
  		}
  	}

  });
