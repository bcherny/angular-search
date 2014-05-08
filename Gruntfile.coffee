module.exports = (grunt) ->

	[
		'grunt-contrib-clean'
		'grunt-contrib-concat'
		'grunt-contrib-jasmine'
		'grunt-contrib-sass'
		'grunt-contrib-watch'
		'grunt-html2js'
		'grunt-ngmin'
	].forEach grunt.loadNpmTasks

	# main build task
	build = ['ngmin', 'html2js', 'concat', 'clean', 'sass']

	# task defs
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
				src: './src/list-filter-text.js'
				options:
					specs: './test/test.js'
					vendor: [
						'./bower_components/jquery/dist/jquery.js'
						'./bower_components/angular/angular.js'
						'./bower_components/angular-mocks/angular-mocks.js'
						'./dist/template.js'
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

		watch:
			main:
				files: './src/*'
				tasks: build
				options:
					interrupt: true
					spawn: false
			test:
				files: './test/*.js'
				tasks: ['html2js', 'jasmine']
				options:
					interrupt: true
					spawn: false

	grunt.registerTask 'default', build
	grunt.registerTask 'test', ['html2js', 'jasmine']