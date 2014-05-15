/**
 * List filter text directive
 * @description a nice text input for search
 * @authors
 *   Hanna Hoang <hhoang@turn.com>
 *   Chris Zheng <czheng@turn.com>
 *   Boris Cherny <bcherny@turn.com>
 */

angular
.module('listFilterText', ['listFilterTextTemplate'])
.constant('KEYS', {
	enter: 13,
	esc: 27
})
.directive('listFilterText', function (KEYS) {

	return {
		restrict: 'E',
		scope: {
			param: '=',
			class: '@',
			typeAhead: '=',
			placeholder: '@',
            disabled: '=',
            search: '&'
		},
		templateUrl: 'list-filter-text.html',
		link: function (scope, element, attrs) {

			angular.extend(scope, {

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
						scope.update();
					} else {
						scope.dirty = true;
					}
				},

				/**
				 * Updates the model that the user passed in (attributes#param)
				 */
				update: function() {
					scope.search({
						$param: scope.param
					});
					scope.dirty = false;
				},

				/**
				 * Clears the <input>
				 */
				clear: function() {
					scope.param = '';
					scope.update();
				}

			});

			// TODO: investigate why this doesn't work when
			//       declared in the DOM
			element.find('input').on('keyup paste', scope.change);

		}
	};

});