angular.module('myApp')
.factory('apiService', function($http) {

    return {
		getProperty: function() {
			return $http({
				method: "GET",
				url: "http://localhost:3000/api/units",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		},

		findPropertyByCoord: function(radius, log, lat) {
			return $http({
				method: "POST",
				url: "http://localhost:3000/api/units/find?radius="+radius+"&longitude="+log+"&latitude="+lat,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		},

		getPropertyById: function(id) {
			return $http({
				method: "GET",
				url: "http://localhost:3000/api/units/"+id,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		},

		searchProp: function(key) {
			return $http({
				method: "POST",
				url: "http://localhost:3000/api/units/search?q="+key,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		}

	}
});