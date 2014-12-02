search directive
==========================

a simple search directive

![screenshot](https://raw.githubusercontent.com/turn/angular-search/master/screenie.png)

## dependencies

- angular 1.x

## features

- lightweight
- configurable behavior
- supports both basic (click on affordances) and pro user (keyboard-only) interactions
- supports any number of directive instances on one page
- 100% test coverage

## installation

```bash
# using bower:
bower install --save angular-search

# .. or, using NPM:
npm install --save angular-search
```

## usage

```html
<div ng-controller="mainCtrl">
	<search
		class="size-medium"
		param="searchText"
		placeholder="Search"
		search="search($param)"
	></search>
	<a ng-click="clear()">Clear</a>
</div>
```

```js
angular
.module('demo', ['turn/search'])
.controller('mainCtrl', function ($scope, $http) {

	angular.extend($scope, {
		searchText: '',
		clear: function() {
			$scope.searchText = '';
			$scope.search();
		},
		search: function (param) {

			...

		}
	});

});
```

## options

```html
<search
	<!-- css class(es) -->
	class="size-medium"

	<!-- disable the input when $scope.foo evaluates to true -->
	disabled="foo"

	<!-- param to update in the model when the user presses ENTER -->
	param="searchText"

	<!-- placeholder text when the input is empty -->
	placeholder="Search"

	<!--
		search function to call (passed the search string),
		should be defined on the controller's $scope
	-->
	search="fn($param)"

	<!-- submit onKeyUp rather than onSubmit -->
	typeAhead="true"
></search>
```

## hacking on it

```bash
bower install
npm install
grunt watch
```

## running the demo

```bash
bower install
npm install
node server/index
```

then open demo/index.html in a browser

## running the tests

```bash
bower install
npm install
grunt test
```