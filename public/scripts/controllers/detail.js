'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('myApp')
  .controller('DetailCtrl', function ($scope,apiService,$routeParams) {

    var id = $routeParams.id;

    $scope.properties = [];

    apiService.getPropertyById(id)
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
