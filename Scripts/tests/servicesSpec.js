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

describe("Services", function () {
	beforeEach(function () {
		// load the module.
		module('healthCalc');
	});

describe('httpBasedService', function () {
	var httpBasedService,
      httpBackend;

	beforeEach(function () {

		// get your service, also get $httpBackend
		// $httpBackend will be a mock, thanks to angular-mocks.js
		inject(function ($httpBackend, _httpBasedService_) {
			httpBasedService = _httpBasedService_;
			httpBackend = $httpBackend;
		});
	});

	// make sure no expectations were missed in your tests.
	// (e.g. expectGET or expectPOST)
	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('should return the response', function () {
		// set up some data for the http call to return and test later.
		var returnData = { "authenticated": false, "_links": { "self": { "href": "https://www.jiwhiz.com/api/public" }, "blogs": { "href": "https://www.jiwhiz.com/api/public/blogs{?page,size,sort}", "templated": true }, "blog": { "href": "https://www.jiwhiz.com/api/public/blogs/{blogId}", "templated": true }, "currentUser": { "href": "https://www.jiwhiz.com/api/currentUser" }, "latestBlog": { "href": "https://www.jiwhiz.com/api/public/latestBlog" }, "recentBlogs": { "href": "https://www.jiwhiz.com/api/public/recentBlogs" }, "recentComments": { "href": "https://www.jiwhiz.com/api/public/recentComments" }, "tagCloud": { "href": "https://www.jiwhiz.com/api/public/tagClouds" }, "profile": { "href": "https://www.jiwhiz.com/api/public/profiles/{userId}", "templated": true }, "postComment": { "href": "https://www.jiwhiz.com/api/user/blogs/{blogId}/comments", "templated": true } } };

		// expectGET to make sure this is called once.
		httpBackend.expectGET('https://www.jiwhiz.com/api/public').respond(returnData);

		// make the call.
		var returnedPromise = httpBasedService.load();

		// set up a handler for the response, that will put the result
		// into a variable in this scope for you to test.
		var result;
		returnedPromise.then(function (response) {
			result = response;
		});

		// flush the backend to "execute" the request to do the expectedGET assertion.
		httpBackend.flush();

		// check the result. 
		// (after Angular 1.2.5: be sure to use `toEqual` and not `toBe`
		// as the object will be a copy and not the same instance.)
		expect(result).toEqual(returnData);
	});
});
});