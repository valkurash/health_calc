///<reference path="../../Scripts/jquery-1.9.1.js"/>

///<reference path="../../Scripts/qUnit/qunit.js"/>

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



var injector = angular.injector(['ng', 'ngMock', 'healthCalc']);
var $httpBackend, $http, bService;


var init = {
	setup: function () {
		this.$scope = injector.get('$rootScope').$new();
		var $controller = injector.get('$controller');
		$controller('HealthController', {
			$scope: this.$scope
		});
		$httpBackend = injector.get("$httpBackend");
		$http = injector.get("$http");
		bService = injector.get('httpBasedService');
	}
};

module('tests', init);

test('HealthController', function () {
	
	equal(10, this.$scope.preparedInsurance.length, 'should have 10 prepared insurance');
});

test('directive: help-element', function () {
	var $compile = injector.get('$compile');
	var element = $compile('<div><help-element regulartext="Regular Text"></help-element></div>')(this.$scope);
	var span1 = element.find('span.help-icon');
	var span2 = span1.find('span.help-icon__popup');
	var span3 = span2.find('span.help-icon__inner');
	equal(span1.length + span2.length + span3.length, 3, 'should be rendered');
	equal(span3.text(), 'Regular Text', 'should set hint regular text');
	span1.click();
	equal(span1.hasClass('_active'), true, 'should set active class when help-icon clicked');
});

test('services: httpBasedService', function () {

	var returnData = { "authenticated": false, "_links": { "self": { "href": "https://www.jiwhiz.com/api/public" }, "blogs": { "href": "https://www.jiwhiz.com/api/public/blogs{?page,size,sort}", "templated": true }, "blog": { "href": "https://www.jiwhiz.com/api/public/blogs/{blogId}", "templated": true }, "currentUser": { "href": "https://www.jiwhiz.com/api/currentUser" }, "latestBlog": { "href": "https://www.jiwhiz.com/api/public/latestBlog" }, "recentBlogs": { "href": "https://www.jiwhiz.com/api/public/recentBlogs" }, "recentComments": { "href": "https://www.jiwhiz.com/api/public/recentComments" }, "tagCloud": { "href": "https://www.jiwhiz.com/api/public/tagClouds" }, "profile": { "href": "https://www.jiwhiz.com/api/public/profiles/{userId}", "templated": true }, "postComment": { "href": "https://www.jiwhiz.com/api/user/blogs/{blogId}/comments", "templated": true } } };

	// expectGET to make sure this is called once.
	$httpBackend.expectGET('https://www.jiwhiz.com/api/public').respond(returnData);

	// make the call.
	var returnedPromise = bService.load();

	// set up a handler for the response, that will put the result
	// into a variable in this scope for you to test.
	var result;
	returnedPromise.then(function (response) {
		result = response;
	});

	// flush the backend to "execute" the request to do the expectedGET assertion.
	$httpBackend.flush();

	equal(result, returnData, 'should return the response');
});