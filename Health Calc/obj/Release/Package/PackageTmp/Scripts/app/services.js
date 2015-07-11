// Define you service here. Services can be added to same module as 'main' or a seperate module can be created.

var angularStartServices = angular.module('angularStart.services', []); //Define the services module

//сервис для тестов
angularStartServices.factory('httpBasedService', ['$http', function ($http) {
	return {
		load: function () {
			return $http.get('https://www.jiwhiz.com/api/public')
        .then(function (result) {
        	return result.data;
        });
		}
	};
}]);