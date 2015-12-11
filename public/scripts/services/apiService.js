angular.module('myApp')
.factory('apiService', function($http) {

    return {
		getProperty: function() {
			return $http({
				method: "GET",
				url: "api/units",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		}

	}
});