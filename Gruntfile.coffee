module.exports = (grunt) ->

	grunt.loadNpmTasks 'grunt-contrib-jasmine'

	grunt.initConfig

		jasmine:
			test:
				src: './list-filter-text.js'
				options:
					specs: './test/test.js'
					vendor: [
						'./bower_components/jquery/dist/jquery.js'
						'./bower_components/angular/angular.js'
						'./bower_components/angular-mocks/angular-mocks.js'
					]
					keepRunner: true

	grunt.registerTask 'default', ['jasmine']