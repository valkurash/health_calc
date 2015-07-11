

var angularStartFilters = angular.module('angularStart.filters', []);

//разбиение числа на тысячи
angularStartFilters.filter("splitDigits", function () {
	return function(input) {
		input = input || '0';
		return input.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
	};
});