// Main configuration file. Sets up AngularJS module and routes and any other config objects

var appRoot = angular.module('healthCalc', ['ngRoute', 'ngResource', 'ngSanitize', 'angularStart.services', 'angularStart.directives', 'angularStart.filters', 'ui.bootstrap']);     //Define the main module

appRoot
    .config(['$routeProvider', function ($routeProvider) {
        //Setup routes to load partial templates from server. TemplateUrl is the location for the server view (Razor .cshtml view)
        $routeProvider
            .when('/healthCalculator', { templateUrl: '/home/healthCalc', controller: 'HealthController' })
            /*.when('/about', { templateUrl: '/home/about', controller: 'AboutController' })
            .when('/demo', { templateUrl: '/home/demo', controller: 'DemoController' })
            .when('/angular', { templateUrl: '/home/angular' })*/
            .otherwise({ redirectTo: '/healthCalculator' });//under question on integration
    }])
    .controller('RootController', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
        $scope.$on('$routeChangeSuccess', function (e, current, previous) {
        	$scope.activeViewPath = $location.path();
        });

        $scope.insurancesPopup = false;
    	//показ выбора страховок для "Здоровье"
        $scope.healthPopup = false;
        $scope.toggleGeneralPopup = function (open) {
        	if (open) {
        		$scope.insurancesPopup = true;
        		$scope.healthPopup = false;
	        } else {
        		$scope.insurancesPopup = false;
        		$scope.healthPopup = false;
	        }
        	
        };
        
    }]);

appRoot.run(function ($rootScope) {
	$(function () {
		$.extend($.inputmask.defaults.definitions, {
			'c': {
				"validator": "[А-Яа-яЁё \.\-\]",
				"cardinality": 1,
				'prevalidator': null
			},
			't': {
				"validator": "(0[0-9]|1[0-9]|2[0-3])",
				"cardinality": 2,
				"prevalidator": [
                        { validator: "[012]", cardinality: 1 }
				]
			}
		});

		$(window).scroll(function () {
			var offset = $('.header').offset().top;
			if (offset > 0) {
				$('.header').addClass('active');
			} else {
				$('.header').removeClass('active');
			}
		});
	});
});
