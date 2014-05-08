angular.module('listFilterTextTemplate', ['list-filter-text.html']);

angular.module("list-filter-text.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("list-filter-text.html",
    "<form class=\"list-filter-text\">\n" +
    "	<span class=\"tif-search\"></span>\n" +
    "	<span class=\"tif-delete\" ng-show=\"searchString\" ng-click=\"clearSearch()\"></span>\n" +
    "	<input\n" +
    "		type=\"search\"\n" +
    "		ng-model=\"searchString\"\n" +
    "		class=\"{{ class }}\"\n" +
    "		ng-disabled=\"disabled\"\n" +
    "		placeholder=\"{{ placeholder }}\"\n" +
    "	>\n" +
    "	<span\n" +
    "		class=\"press-enter\"\n" +
    "		ng-click=\"updateFilterMap()\"\n" +
    "		ng-show=\"!typeAhead && dirty && !loading\"\n" +
    "	>Press <kbd>enter</kbd> to search</span>\n" +
    "</form>");
}]);

/**
 * List filter text directive
 * @description a nice text input for search
 * @authors
 * 	"Hanna Hoang <hhoang@turn.com>,
 *  "Chris Zheng <czheng@turn.com>"
 *  "Boris Cherny <bcherny@turn.com>"
 */
angular.module('listFilterText', ['listFilterTextTemplate']).constant('KEYS', {
  enter: 13,
  esc: 27
}).service('listFilterTextApi', function () {
  this.clear = function () {
    this.clearFlag = true;
  };
  this.reset = function () {
    this.clearFlag = false;
  };
  this.reset();
}).directive('listFilterText', [
  'KEYS',
  'listFilterTextApi',
  '$timeout',
  function (KEYS, listFilterTextApi, $timeout) {
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
          dirty: false,
          blur: function () {
            element.find('input').blur();
          },
          change: function (e) {
            var code = e.keyCode || e.which;
            if (scope.typeAhead || code === KEYS.enter) {
              scope.search();
            } else if (code === KEYS.esc) {
              scope.clear();
              scope.blur();
            } else {
              scope.dirty = true;
            }
          },
          search: function () {
            // TODO: investigate why $timeout is needed here.
            $timeout(function () {
              scope.param = scope.searchString;
            });
            scope.dirty = false;
          },
          clear: function () {
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
  }
]);