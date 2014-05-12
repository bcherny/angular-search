describe 'list-filter-text', ->

	describe 'listFilterTextApi', ->

		beforeEach module 'listFilterText'

		beforeEach inject ($injector) ->

			@service = $injector.get 'listFilterTextApi'


		it 'should set clearFlag to false when #reset is called', ->

			@service.clearFlag = true

			do @service.reset

			expect @service.clearFlag
			.toBe false
			
		it 'should set clearFlag to true when #clear is called', ->

			@service.clearFlag = false

			do @service.clear

			expect @service.clearFlag
			.toBe true


	describe 'listFilterTextDirective', ->

		KEYS =
			enter: 13,
			esc: 27

		listFilterTextApi = ->
			@clear = ->
			@reset = ->

		beforeEach (module 'listFilterText'), ($provide) ->
			
			$provide.value 'KEYS', KEYS
			$provide.value 'listFilterTextApi', listFilterTextApi
		
		beforeEach ->

			inject (@$compile, $rootScope, $controller) =>

				@scope = do $rootScope.$new

				@element = angular.element """
					<list-filter-text
						class="size-medium"
						param="searchText"
						placeholder="Search"
						typeAhead="false"
						disabled="foo"
					></list-filter-text>
				"""

		beforeEach ->

			(@$compile @element) @scope
			do @scope.$apply
			@scope = do @element.scope


		#########################################

		it 'should set the element\'s className to the "class" attribute', ->

			expect @element.find('input').hasClass 'size-medium'
			.toBe true

		it 'should set the element\'s placeholder to the "placeholder" attribute', ->

			expect @element.find('input').attr 'placeholder'
			.toBe 'Search'

		it 'should set the element\'s disabled attribute to true when the disabled expression is truthy', inject ($rootScope) ->

			$rootScope.foo = 1;

			do @scope.$apply

			expect @element.find('input').attr 'disabled'
			.toBe 'disabled'

			$rootScope.foo = false

			do @scope.$apply

			expect @element.find('input').attr 'disabled'
			.toBe undefined


		describe '#change', ->

			it 'should call #search if the user pressed ENTER', ->

				spyOn @scope, 'search'

				@scope.change
					keyCode: 13

				do expect @scope.search
				.toHaveBeenCalled

			it 'should call #search if typeAhead is true', ->

				spyOn @scope, 'search'

				@scope.typeAhead = true

				@scope.change
					keyCode: -1

				do expect @scope.search
				.toHaveBeenCalled

			it 'should call not call #search otherwise', ->

				spyOn @scope, 'search'

				@scope.typeAhead = false

				@scope.change
					keyCode: -1

				do expect @scope.search
				.not.toHaveBeenCalled

			it 'should call #clear and #blur if the user pressed ESC, regardless of typeAhead', ->

				@scope.typeAhead = true

				spyOn @scope, 'clear'
				spyOn @scope, 'blur'

				@scope.change
					keyCode: 27

				do expect @scope.blur
				.toHaveBeenCalled

				do expect @scope.clear
				.toHaveBeenCalled

				@scope.typeAhead = false

				@scope.change
					keyCode: 27

				do expect @scope.blur
				.toHaveBeenCalled

				do expect @scope.clear
				.toHaveBeenCalled



			it 'should call not #clear or #blur otherwise', ->

				spyOn @scope, 'clear'
				spyOn @scope, 'blur'

				@scope.change
					keyCode: -1

				do expect @scope.blur
				.not.toHaveBeenCalled

				do expect @scope.clear
				.not.toHaveBeenCalled

			it 'should set scope.dirty to true otherwise', ->

				@scope.dirty = false
				@scope.typeAhead = false

				@scope.change
					keyCode: -1

				expect @scope.dirty
				.toBe true


		describe '#search', ->

			it 'should set scope.param equal to scope.searchString', inject ($timeout) ->

				@scope.param = null
				@scope.searchString = 'foo'

				do @scope.search

				do $timeout.flush

				expect @scope.param
				.toBe @scope.searchString

			it 'should set scope.dirty to false', ->

				@scope.dirty = true

				do @scope.search

				expect @scope.dirty
				.toBe false


		describe '#clear', ->

			it 'should set scope.searchString to ""', ->

				@scope.searchString = 'foo'

				do @scope.clear

				expect @scope.searchString
				.toBe ''

			it 'should call #search', ->

				spyOn @scope, 'search'

				do @scope.clear

				do expect @scope.search
				.toHaveBeenCalled


		describe '$watch', ->

			it 'should call #clear when api.clearFlag is set to true', ->

				@scope.api.clearFlag = false

				spyOn @scope, 'clear'

				@scope.api.clearFlag = true

				do @scope.$apply

				do expect @scope.clear
				.toHaveBeenCalled

			it 'should call api#reset when api.clearFlag is set to true', ->

				@scope.api.clearFlag = false

				spyOn @scope.api, 'reset'

				@scope.api.clearFlag = true

				do @scope.$apply

				do expect @scope.api.reset
				.toHaveBeenCalled

			it 'should not call #clear or api#reset when api.clearFlag is set to false', ->

				@scope.api.clearFlag = true

				spyOn @scope, 'clear'
				spyOn @scope.api, 'reset'

				@scope.api.clearFlag = false

				do @scope.$apply

				do expect @scope.clear
				.not.toHaveBeenCalled

				do expect @scope.api.reset
				.not.toHaveBeenCalled