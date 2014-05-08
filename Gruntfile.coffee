module.exports = (grunt) ->

	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-jasmine'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-html2js'
	grunt.loadNpmTasks 'grunt-ngmin'

	grunt.initConfig

		clean:
			main: ['./dist/template.js']

		concat:
			main:
				src: ['./dist/template.js', './dist/list-filter-text.js']
				dest: './dist/list-filter-text.js'

		html2js:
			main:
				src: './src/*.html'
				dest: './dist/template.js'
			options:
				module: 'listFilterTextTemplate'

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

		ngmin:
			main:
				src: ['./src/list-filter-text.js']
				dest: './dist/list-filter-text.js'

		sass:
			main:
				files:
					'./dist/list-filter-text.css': './src/list-filter-text.scss'

	grunt.registerTask 'default', ['ngmin', 'html2js', 'concat', 'clean', 'sass']
	grunt.registerTask 'test', ['jasmine']