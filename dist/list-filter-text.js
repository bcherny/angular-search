angular.module('listFilterTextTemplate', ['list-filter-text.html']);

angular.module("list-filter-text.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("list-filter-text.html",
    "<form class=\"list-filter-text\">\n" +
    "	<span class=\"tif-search\"></span>\n" +
    "	<span class=\"tif-delete\" ng-show=\"param\" ng-click=\"clear()\"></span>\n" +
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
 * List filter text directive
 * @description a nice text input for search
 * @authors
 *   Hanna Hoang <hhoang@turn.com>
 *   Chris Zheng <czheng@turn.com>
 *   Boris Cherny <bcherny@turn.com>
 */
angular.module('listFilterText', ['listFilterTextTemplate']).constant('KEYS', {
  enter: 13,
  esc: 27
}).directive('listFilterText', [
  'KEYS',
  function (KEYS) {
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
          dirty: false,
          blur: function () {
            element.find('input').blur();
          },
          change: function (e) {
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