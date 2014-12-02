angular.module('turn/search/template', ['search.html']);

angular.module("search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search.html",
    "<form class=\"search\">\n" +
    "	<span class=\"turn-search\" ng-click=\"update()\"></span>\n" +
    "	<span class=\"turn-clear\" ng-show=\"param\" ng-click=\"clear()\"></span>\n" +
    "	<input\n" +
    "		type=\"search\"\n" +
    "		ng-model=\"param\"\n" +
    "		class=\"{{ class }}\"\n" +
    "		ng-disabled=\"disabled\"\n" +
    "		placeholder=\"{{ placeholder }}\"\n" +
    "	>\n" +
    "	<span\n" +
    "		class=\"press-enter\"\n" +
    "		ng-click=\"update()\"\n" +
    "		ng-show=\"!typeAhead && dirty && !loading\"\n" +
    "	>Press <kbd>enter</kbd> to search</span>\n" +
    "</form>");
}]);

/**
 * Search directive
 * @description a nice text input for search
 * @authors
 *   Hanna Hoang <hhoang@turn.com>
 *   Chris Zheng <czheng@turn.com>
 *   Boris Cherny <bcherny@turn.com>
 */
angular.module('turn/search', ['turn/search/template']).constant('SEARCH_KEYS', {
  enter: 13,
  esc: 27
}).directive('search', [
  'SEARCH_KEYS',
  function (SEARCH_KEYS) {
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
      templateUrl: 'search.html',
      link: function (scope, element, attrs) {
        angular.extend(scope, {
          dirty: false,
          blur: function () {
            element.find('input').blur();
          },
          change: function (e) {
            var code = e.keyCode || e.which;
            if (code === SEARCH_KEYS.esc) {
              scope.clear();
              scope.blur();
            } else if (code === SEARCH_KEYS.enter || scope.typeAhead) {
              scope.update();
            } else {
              scope.dirty = true;
            }
          },
          update: function () {
            scope.search({ $param: scope.param });
            scope.dirty = false;
          },
          clear: function () {
            scope.param = '';
            scope.update();
          }
        });
        // TODO: investigate why this doesn't work when
        //       declared in the DOM
        element.find('input').on('keyup paste', scope.change);
      }
    };
  }
]);