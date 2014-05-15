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

		clean:
			main: ['./dist/template.js']

		coffee:
			files:
				'test/test.js': 'test/test.coffee'

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