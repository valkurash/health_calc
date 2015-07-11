///<reference path="../../Scripts/jquery-1.9.1.js"/>

///<reference path="../../Scripts/jasmine/jasmine.js"/>
///<reference path="../../Scripts/jasmine/jasmine-jquery.js"/>

///<reference path="../../Scripts/angular.js"/>
///<reference path="../../Scripts/angular-mocks.js"/>
///<reference path="../../Scripts/angular-resource.js"/>
///<reference path="../../Scripts/angular-sanitize.js"/>
///<reference path="../../Scripts/angular-route.js"/>
///<reference path="../../Scripts/ui-bootstrap.js"/>


///<reference path="../../Scripts/app/app.js"/>
///<reference path="../../Scripts/app/controllers.js"/>
///<reference path="../../Scripts/app/services.js"/>
///<reference path="../../Scripts/app/directives.js"/>
///<reference path="../../Scripts/app/filters.js"/>

describe("Controllers", function () {

	beforeEach(module("healthCalc"));

	describe('HealthController', function () {

		var scope,
				timeout,
				controller;

		beforeEach(inject(function ($rootScope, $timeout, $controller ) {
			scope = $rootScope.$new();
			timeout = $timeout;
			controller = $controller('HealthController', { $scope: scope, $timeout: timeout });
		}));

		it('should have 10 prepared insurance', function () {
			expect(scope.preparedInsurance.length).toBe(10);
		});
	});
	
});