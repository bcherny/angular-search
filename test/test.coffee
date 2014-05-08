describe 'list-filter-text', ->

	beforeEach ->
		module 'listFilterTextTemplate'
		module 'listFilterText'
	
	beforeEach inject (@$compile, $rootScope) ->

		@scope = do $rootScope.$new

		@element = angular.element """
			<list-filter-text
				param="searchText"
				size="medium"
				placeholder="Search"
			></list-filter-text>
		"""

	beforeEach ->

		(@$compile @element) @scope
		do @scope.$digest


	#########################################


	describe '#foo', ->

		it 'should bar', ->

			expect true
			.toBe true