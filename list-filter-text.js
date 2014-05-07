angular
.module('listFilterText', [])
.constant('KEYS', {
	enter: 13,
	esc: 27
})
.directive('listFilterText', function (KEYS, $timeout) {

	return {
		restrict: 'E',
		scope: {
			param: '=',
			size: '@',
			typeAhead: '=',
			placeholder: '@',
			clearText: '=',
            // disableExp: '='
		},
		templateUrl: './list-filter-text.html',
		link: function (scope, element) {

			angular.extend(scope, {

				dirty: null,

				blur: function() {
					element.find('input').blur();
				},

				keyup: function(e) {
					var code = e.keyCode || e.which;

					if (code === KEYS.esc) {
						scope.clearSearch();
						scope.blur();
					} else if (scope.typeAhead === true || code === KEYS.enter) {
						e.preventDefault();
						scope.updateFilterMap();
					} else {
						scope.dirty = true;
					}
				},

				updateFilterMap: function() {
					// TODO: investigate why $timeout is needed here.
					//       is this an angular bug?
					$timeout(function(){
						scope.param = scope.searchString;
					});
					scope.dirty = null;
				},

				clearSearch: function() {
					scope.searchString = '';
					scope.updateFilterMap();
				}

			});

			scope.$watch('clearText', function(){
				if (scope.clearText === true) {
					scope.clearSearch();
					scope.clearText = false;
				}
			});

			// TODO: investigate why this doesn't work when
			//       declared in the DOM
			element.find('input').on('keyup', scope.keyup);

		}
	};
});