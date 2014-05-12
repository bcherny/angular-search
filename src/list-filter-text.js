/**
 * List filter text directive
 * @description a nice text input for search
 * @authors
 * 	"Hanna Hoang <hhoang@turn.com>,
 *  "Chris Zheng <czheng@turn.com>"
 *  "Boris Cherny <bcherny@turn.com>"
 */

angular
.module('listFilterText', ['listFilterTextTemplate'])
.constant('KEYS', {
	enter: 13,
	esc: 27
})
.service('listFilterTextApi', function() {

	this.clear = function() {
		this.clearFlag = true;
	};

	this.reset = function() {
		this.clearFlag = false;
	};

	this.reset();

})
.directive('listFilterText', function (KEYS, listFilterTextApi, $timeout) {

	return {
		restrict: 'E',
		scope: {
			param: '=',
			class: '@',
			typeAhead: '=',
			placeholder: '@',
            disabled: '='
		},
		templateUrl: 'list-filter-text.html',
		link: function (scope, element, attrs) {

			angular.extend(scope, {

				api: listFilterTextApi,

				/**
				 * True when the user has entered text that
				 * has not yet been submitted
				 * @type {Boolean}
				 */
				dirty: false,

				/**
				 * Programatically blurs the <input>
				 */
				blur: function() {
					element.find('input').blur();
				},

				/**
				 * Fired by the <input> on onKeyUp
				 * @param  {Event} e
				 */
				change: function(e) {
					var code = e.keyCode || e.which;

					if (code === KEYS.esc) {
						scope.clear();
						scope.blur();
					} else if (code === KEYS.enter || scope.typeAhead) {
						scope.search();
					} else {
						scope.dirty = true;
					}
				},

				/**
				 * Updates the model that the user passed in (attributes#param)
				 */
				search: function() {
					// TODO: investigate why $timeout is needed here.
					$timeout(function(){
						scope.param = scope.searchString;
					});
					scope.dirty = false;
				},

				/**
				 * Clears the <input>
				 */
				clear: function() {
					scope.searchString = '';
					scope.search();
				}

			});
			
			/**
			 * Programatically clear the input
			 */
			scope.$watch('api.clearFlag', function (bool) {
				if (bool === true) {
					scope.clear();
					scope.api.reset();
				}
			});

			// TODO: investigate why this doesn't work when
			//       declared in the DOM
			element.find('input').on('keyup paste', scope.change);

		}
	};

});