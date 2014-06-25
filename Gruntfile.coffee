module.exports = (grunt) ->

	[
		'grunt-contrib-clean'
		'grunt-contrib-coffee'
		'grunt-contrib-concat'
		'grunt-contrib-jasmine'
		'grunt-contrib-compass'
		'grunt-contrib-watch'
		'grunt-html2js'
		'grunt-ngmin'
	].forEach grunt.loadNpmTasks

	# task sets
	build = ['ngmin', 'html2js', 'concat', 'clean', 'compass']
	test = ['html2js', 'coffee', 'jasmine']

	# task defs
	grunt.initConfig

		pkg: grunt.file.readJSON 'package.json'

		clean:
			main: ['./dist/template.js']

		coffee:
			files:
				'test/test.js': 'test/test.coffee'

		concat:
			main:
				src: ['./dist/template.js', './dist/<%= pkg.name %>.js']
				dest: './dist/<%= pkg.name %>.js'

		html2js:
			main:
				src: './src/*.html'
				dest: './dist/template.js'
			options:
				module: 'turn/searchTemplate'

		jasmine:
			coverage:
				src: ['./dist/<%= pkg.name %>.js']
				options:
					specs: ['./test/test.js']
					template: require 'grunt-template-jasmine-istanbul'
					templateOptions:
						coverage: 'bin/coverage/coverage.json'
						report: 'bin/coverage'
					vendor: [
						'./bower_components/jquery/dist/jquery.js'
						'./bower_components/angular/angular.js'
						'./bower_components/angular-mocks/angular-mocks.js'
						'./dist/template.js'
					]

			test:
				src: './src/<%= pkg.name %>.js'
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
				src: ['./src/<%= pkg.name %>.js']
				dest: './dist/<%= pkg.name %>.js'

		compass:
			main:
				options:
					cssDir: 'dist'
					sassDir: 'src'
					httpFontsPath: '../bower_components/turn-icon-font/dist'

		watch:
			main:
				files: './src/*'
				tasks: build
				options:
					interrupt: true
					spawn: false
			test:
				files: './test/*.js'
				tasks: test
				options:
					interrupt: true
					spawn: false

	grunt.registerTask 'default', build
	grunt.registerTask 'test', test