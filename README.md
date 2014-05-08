list-filter-text directive
==========================

a simple search directive

![screenshot](https://stash.turn.com/projects/CNSL/repos/list-filter-text/browse/screenie.png?raw&at=alpha)

## dependencies

- angular 1.0.8
- bootstrap 3.x.x
- jquery 1.x.x
- turn-icon-font 0.x.x

## installation

```bash
bower install ssh://git@stash.turn.com:7999/cnsl/list-filter-text.git#0.x.x
```

## usage

```html
<div ng-controller="mainCtrl">
	<list-filter-text
		param="searchText"
		size="medium"
		placeholder="Search"
	></list-filter-text>
	<a ng-click="clear()">Clear</a>
</div>
```

```js
angular
.module('demo', ['listFilterText'])
.controller('mainCtrl', function ($scope, $http, listFilterTextApi) {

	angular.extend($scope, {
		searchText: '',
		clear: listFilterTextApi.clear
	});

	$scope.$watch('searchText', function (text) {

		...

	});

});
```

## options

```html
<list-filter-text
	<!-- param to update in the model when the user presses ENTER -->
	param="searchText"

	<!-- css class(es) -->
	class="size-medium"

	<!-- placeholder text when the input is empty -->
	placeholder="Search"

	<!-- submit onKeyUp rather than onSubmit -->
	typeAhead="true"

	<!-- disable the input when this expression evaluates to true -->
	disabled="foo=true"
></list-filter-text>
```