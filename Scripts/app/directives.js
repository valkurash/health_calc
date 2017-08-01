// Define you directives here. Directives can be added to same module as 'healtCalc' or a seperate module can be created.

var angularStartDirectives = angular.module('angularStart.directives', []);     //Define the directive module

angularStartDirectives.directive("sticky", function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			$(function () {
				$(element).sticky({ topSpacing: 100, bottomSpacing: 400 });
			});
		}
	};
});
angularStartDirectives.directive("helpElement", function () {
	return {
		replace: true,
		restrict: 'E',
		scope: false,
		template: function (element, attrs) {
			if (attrs.regulartext) {
				return '<span class="help-icon" >' +
									'<span class="help-icon__popup">' +
										'<span class="help-icon__inner">' + attrs.regulartext + '</span>' +
									'</span>' +
								'</span>';
			}
			return '<span class="help-icon" ng-show="' + attrs.text + '">' +
									'<span class="help-icon__popup">' +
											'<span class="help-icon__inner" ng-bind-html="' + attrs.text + '"></span>' +
									'</span>' +
							 '</span>';
		},
		link: function (scope, elem) {
			elem.on("click", function () {
				if (elem.hasClass("_active")) {
					elem.removeClass('_active');
				} else {
					angular.element(document.querySelector('.help-icon._active')).removeClass('_active');
					elem.addClass('_active');
					var popup = elem.find('.help-icon__popup');
					var popupOffset = elem.offset().top - popup.outerHeight(true);
					var toTop = elem.offset().top - $(window).scrollTop();
					var toBottom = $(window).scrollTop() + $(window).height() - elem.offset().top;


					var top = $(window).scrollTop() + $('.header').outerHeight();
					if (popupOffset < top && toBottom > toTop) {
						popup.removeClass('help-icon__popup_up').addClass('help-icon__popup_down');
						popup.css({
							top: $(this).height()
						});
					} else {
						popup.removeClass('help-icon__popup_down').addClass('help-icon__popup_up');
						popup.css({
							top: -popup.outerHeight(true)
						});
					}
				}
				return false;
			});
			$('body').on("click", function (event) {
				var target = $(event.target);
				if (!target.hasClass('help-icon') && !target.hasClass('help-icon__popup_up')) {
					$('.help-icon._active').removeClass('_active');
				}
			});
		}

	};
});
angularStartDirectives.directive("showMenuAnimation", function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			$(function () {
				element.on("click", function () {
					$('.animation_menu').show().addClass('animate_menu');
				});

				$('body').on("click", function (event) {
					var target = $(event.target);
					if (!target.hasClass('change_insurance')) {
						$('.animation_menu').hide().removeClass('animate_menu');
					}
				});
				$('.animate_menu .chosen').on("click", function (event) {
					var target = $(event.target);
					if (!target.hasClass('change_insurance')) {
						$('.animation_menu').hide().removeClass('animate_menu');
					}
				});
			});
		}
	};
});
angularStartDirectives.directive("spinner", ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			$(function () {
				element.TouchSpin({
					buttondown_txt: '',
					buttonup_txt: '',
					max: attrs.max
				});
				element.on('change', function (event) {
					scope.$apply(function () {
						$parse(attrs.ngModel).assign(scope.$parent.$parent, event.target.value);
					});
				});
			});
		}
	};
}]);
angularStartDirectives.directive("slider", ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			$(function () {

				var setSlider=function(el, newVal, minVal, maxVal, stepVal) {
					$(el).slider({
						value: newVal,
						min: minVal,
						max: maxVal,
						step: stepVal
					}).find(".slider_input").val(newVal.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
				}

				var value = parseInt(attrs.value, 10);
				var min = parseInt(attrs.min, 10);
				var max = parseInt(attrs.max, 10);
				var step = parseInt(attrs.step, 10);

				//var tooltip = $('<div class="slider__info">' + value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + '</div>');
				var tooltip = $('<div class="slider__info"></div>');
				var input = $('<input type="text" class="slider_input" value="' + value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + '"/>');
				$(element).slider({
					value: value,
					min: min,
					max: max,
					step: step,
					range: "min",
					animate: true,
					slide: function (event, ui) {
						//tooltip.text(ui.value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
						tooltip.children('input').val(ui.value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
					},
					change: function (event, ui) {
						if (!scope.$$phase) {
							scope.$apply(function () {
								$parse(attrs.ngModel).assign(scope.$parent.$parent, ui.value);
							});
						}
						
					},
				}).find(".ui-slider-handle").unbind('keydown').append(tooltip.append(input));

				input.on('focus', function() {
					var onlyNumber = $(this).val().toString().replace(/\D/g, '');
					$(this).val(onlyNumber);
				});
				input.on('blur', function () {
					var newVal = $(this).val();
					var min = parseInt(attrs.min, 10);
					var max = parseInt(attrs.max, 10);
					if (newVal < min) {
						newVal = min;
					} else if (newVal > max) {
						newVal = max;
					}
					$(element).slider("value", newVal);
					var thousands = newVal.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
					$(this).val(thousands);
				});
				input.on('keydown', function(e) {
					// Allow: backspace, delete
					if ($.inArray(e.keyCode, [46, 8]) !== -1 ||
						// Allow: Ctrl+A
							(e.keyCode == 65 && e.ctrlKey === true) ||
						// Allow: home, end, left, right, down, up
							(e.keyCode >= 35 && e.keyCode <= 40)) {
						// let it happen, don't do anything
						return;
					}
					//enter
					if (e.keyCode == 13) {
						$(this).trigger('blur');
					}
					// Ensure that it is a number and stop the keypress
					if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
						e.preventDefault();
					}
				});

				scope.$watch('yourpriceSlider.refreshCounter', function (newValue, oldValue) {
					if (newValue !== oldValue) {
						var sliderObj = scope.yourpriceSlider;
						setSlider(element, sliderObj.value, sliderObj.minValue, sliderObj.maxValue, sliderObj.stepValue);
					}
				});
			});


		}
	};
}]);
angularStartDirectives.directive('scrollOnClick', function () {
	return {
		restrict: 'A',
		link: function (scope, $elm, attrs) {
			$elm.on('click', function () {
				if (!$elm.hasClass('_disabled')) {
					//if (attrs.scrollOnClick) {
						//var el = $(attrs.scrollOnClick).eq(0);
						//$("body,html").animate({ scrollTop: el.offset().top }, "slow");
					//} else {
						$("body,html").animate({ scrollTop: 0 }, "slow");
					//}
				
				}
				
			});
		}
	}
});
angularStartDirectives.directive('setMask', function () {
	return {
		restrict: 'A',
		link: function (scope, $elm, attr) {

			$(function () {
				if (attr.setMask) {
					$elm.inputmask({ "mask": attr.setMask, "repeat": attr.maskGreedy?'*':false, "greedy": !attr.maskGreedy });
				}
			});
		}
	}
});
// deprecated, use inputmask
angularStartDirectives.directive('hourInput', function () {
	return {
		restrict: 'A',
		link: function (scope, $elm, attr) {
			$elm.on('keydown', function(e) {
				// Allow: backspace, delete
				if ($.inArray(e.keyCode, [46, 8]) !== -1 ||
					// Allow: Ctrl+A
					(e.keyCode == 65 && e.ctrlKey === true) ||
					// Allow: home, end, left, right, down, up
					(e.keyCode >= 35 && e.keyCode <= 40)) {
					// let it happen, don't do anything
					return;
				}
				//enter
				if (e.keyCode == 13) {
					$(this).trigger('blur');
				}
				var val = $(this).val().replace(/[^0-9\.]+/g, '');
				// Ensure that it is a number and stop the keypress
				if (val) {
					if (val == 1) {
						//0-9
						if ($.inArray(e.keyCode, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99,100,101,102,103,104, 105]) === -1) {
							e.preventDefault();
						}
					} else if (val == 2) {
						//0-3
						if ($.inArray(e.keyCode, [48, 49, 50, 51, 96, 97, 98, 99]) === -1) {
							e.preventDefault();
						}
					} else {
						return true;
					}
				}
				else {
					if ($.inArray(e.keyCode, [49, 50, 97, 98]) === -1) {
						e.preventDefault();
					} else {
						return true;
					}
				}
			});
		}
	}
});
angularStartDirectives.directive('callbackForm', function () {
	return {
		restrict: 'E',
		scope: {
			key: '@'
		},
		templateUrl: 'templates/callbackForm.html',
		controller: ["$scope", function ($scope) {
			//datepicker
			$scope.openDatePicker = function ($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.callback[opened] = !$scope.callback[opened];
			};
		}]
	};
}); 
angularStartDirectives.directive('flatHealthCalculator', function () {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'templates/flatHealthCalculator.html',
		controller: ["$scope", function ($scope) {

		}]
	};
});
angularStartDirectives.directive('insurerForHealth', function () {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'templates/insurerForHealth.html',
		controller:  ["$scope", function ($scope) {
			//datepicker
			$scope.openInsurerDp = function ($event, opened, objString, index) {
				$event.preventDefault();
				$event.stopPropagation();
				if (objString) {
					var i = parseInt(index);
					if (i>=0) {
						$scope[objString][i][opened] = !$scope[objString][i][opened];
					} else {
						$scope[objString][opened] = !$scope[objString][opened];
					}
				} else {
					$scope.insurer[opened] = !$scope.callback[opened];
				}
				
			};
		}]
	};
});
angularStartDirectives.directive("autocomplete", function () {
	return {
		restrict: 'A',
		link: function (scope, $elm, attrs) {

			$(function () {
				var availableCities = [
					"Гомель",
					"Москва",
					"Омск",
					"Санкт-Петербург"
				];
				var availableStreets = [
					"1-го Мая ул.",
					"Ленина ул.",
					"Заводская ул.",
					"Бронная ул."
				];
				var src = attrs.autocomplete == 'city' ? availableCities : availableStreets;
				$elm.autocomplete({
					source: src
				});
			});
		}
	};
});
angularStartDirectives.directive('jqueryDatePicker', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			ngModel: '=',
			minDate: '=',
			maxDate: '=',
			defaultDate: '=',
			ident: '='
		},
		link: function (scope, element, attrs, ngModelCtrl) {
			$(function () {
				var options = {
					minDate: scope.minDate,
					maxDate: scope.maxDate,
					defaultDate: scope.defaultDate,
					yearRange: scope.minDate.getFullYear() + ':' + scope.maxDate.getFullYear(),
					onSelect: function(date) {
						scope.$apply(function() {
							ngModelCtrl.$setViewValue(date);
						});
					}
				};
				if (scope.ident) {
					element.prop('id', scope.ident);
				}
					element.datepicker(options);
			});
			var reg = /^(\d{2})\.(\d{2})\.(\d{4})$/;
			//For DOM -> model validation
			ngModelCtrl.$parsers.unshift(function (value) {
				var returned = value;
				if (reg.test(value)) {
					var dateArr = value.split('.');
					var dateObj = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
					var time = dateObj.getTime();
					ngModelCtrl.$setValidity('minDate', !isNaN(time) && time >= scope.minDate.getTime());
					ngModelCtrl.$setValidity('maxDate', !isNaN(time) && time <= scope.maxDate.getTime());
					ngModelCtrl.$setValidity('invalidDate', true);
					returned = dateObj;
				}
				else if (Object.prototype.toString.call(value) === "[object Date]") {
					var time = value.getTime();
					ngModelCtrl.$setValidity('minDate', !isNaN(time) && time >= scope.minDate.getTime());
					ngModelCtrl.$setValidity('maxDate', !isNaN(time) && time <= scope.maxDate.getTime());
					ngModelCtrl.$setValidity('invalidDate', true);
				} else {
					ngModelCtrl.$setValidity('minDate', true);
					ngModelCtrl.$setValidity('maxDate', true);
					ngModelCtrl.$setValidity('invalidDate', false);
				}
				return returned.toLocaleString();
		
			});

			//For model -> DOM validation
			//ngModelCtrl.$formatters.unshift(function (value) {
				//if (Object.prototype.toString.call(value) === "[object Date]") {
					//return value.toLocaleString();
				//}
				//return value;
			//});
		}
	}
});
angularStartDirectives.directive("checkField", function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, $elm, attrs, ngModelCtrl) {

			if (attrs.name === "birthdate" && attrs.checkField === "dateIssue") {
				var reg = /^(\d{2})\.(\d{2})\.(\d{4})$/;
				//For DOM -> model validation
				ngModelCtrl.$parsers.unshift(function (value) {
					if (reg.test(value)) {
						var dateArr = value.split('.');
						var dateObj = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
						var yearPassport = dateObj.getFullYear() + 14;
						dateObj.setFullYear(yearPassport);
						$('#passport-recieved-date').datepicker('option', { yearRange: dateObj.getFullYear() + ':' + scope.insurer.dateIssueMax.getFullYear() });
						scope.insurer.dateIssueMin = dateObj;
						//scope.insurerForm.dateIssue.$setViewValue(scope.insurerForm.dateIssue.$viewValue);
					}
					return value;
				});
			}
		}
	};
});
angularStartDirectives.directive('scrollOnInvalidElement', function () {
	return {
		restrict: 'A',
		link: function (scope, elem) {

			// set up event handler on the form element
			elem.on('submit', function () {

				// find the first invalid element
				var firstInvalid = elem.find('.ng-invalid:first')[0];

				// if we find one, scroll to it 
				if (firstInvalid) {
					var offset = $(firstInvalid).offset().top - 200;//substruct header menu
					$("body,html").animate({ scrollTop: offset }, "slow");
				}
			});
		}
	};
});
angularStartDirectives.directive('scrollToElement', function () {
	return {
		restrict: 'A',
		link: function (scope, $elm) {
			$(function () {
				$elm.on('click', function () {

					var offset = $elm.offset().top-150;
					$("body,html").animate({ scrollTop: offset }, "slow");
				});
			});	
		}
	};
});

