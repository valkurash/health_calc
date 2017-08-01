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

describe("Directives", function () {

	beforeEach(module("angularStart.directives"));

	describe('directive: help-element', function () {
		var elm, scope;

		beforeEach(inject(function ($rootScope, $compile) {
			elm = angular.element(
				'<div>' +
						'<help-element regulartext="Regular Text"></help-element>' +
				'</div>');

			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();
		}));

		it('should be rendered', function () {
			var span1 = elm.find('span.help-icon');
			var span2 = span1.find('span.help-icon__popup');
			var span3 = span2.find('span.help-icon__inner');

			expect(span1.length).toBe(1);
			expect(span2.length).toBe(1);
			expect(span3.length).toBe(1);

		});

		it('should set hint regular text', function () {
			var span = elm.find('.help-icon__inner');

			expect(span.text()).toBe('Regular Text');
		});

		it('should set active class when help-icon clicked', function () {
			var span = elm.find('span.help-icon');
			span.click();
			expect(span).toHaveClass('_active');

		});
	});
	
});