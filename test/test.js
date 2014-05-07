describe('listFilterText directive', function() {
	var elm, scope, isolatedScope;
	var ENTER_KEY_CODE = 13;

	beforeEach(function() {
		elm = angular.element('<list-filter-text param="searchString" size="{{size}}"></list-filter-text>');

		inject(function($rootScope, $compile) {
			scope = $rootScope;
			scope.searchString = null;
			scope.size = 'medium';
			$compile(elm)(scope);
			scope.$digest();
		});

		isolatedScope = elm.scope();
	});

	it('should bind variables', function() {
		expect(isolatedScope.param).toBeNull();
	});

	it('input should be the given size', function() {
		var input = elm.find('input');
		expect(input.hasClass('input-' + scope.size)).toBe(true);
	});

	it('should update filterMap when search button is clicked', function() {
		var input = elm.find('input');
		var searchButton = elm.find('button.searchButton');

		input.val('Sprint');
		input.trigger('input');
		searchButton.click();
		expect(scope.searchString).toBe('Sprint');
	});

	it('should update filterMap when enter key is pressed', function() {
		var input = elm.find('input');
		input.val('Sprint');
		input.trigger('input');
		input.trigger({
			type: 'keyup',
			which: ENTER_KEY_CODE,
			keyCode: ENTER_KEY_CODE
		});
		expect(scope.searchString).toBe('Sprint');
	});

	it('clearSearch should clear the search field', function() {
		var input = elm.find('input');
		input.val('Sprint');
		input.trigger('input');
		expect(input.val()).toBe('Sprint');
		isolatedScope.clearSearch();
		scope.$digest();
		expect(isolatedScope.searchString).toBe('');
		expect(input.val()).toBe('');
		expect(scope.searchString).toBe('');
	});
});