var SERVER_PORT = 9000;
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var serveStatic = require('serve-static');


module.exports = function (grunt) {

	require('time-grunt')(grunt);

	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				nospawn: true,
				livereload: LIVERELOAD_PORT
			},
			sass: {
				files: ['app/styles/*.scss'],
				tasks: ['sass:server']
			},
			livereload: {
				options: {
					livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
				},
				files: [
					'app/*.html',
					'{.tmp,app}/styles/*.css',
					'{.tmp,app}/scripts/*.js',
					'test/spec/*.js'
				]
			}
		},
		connect: {
			options: {
				port: grunt.option('port') || SERVER_PORT,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							serveStatic('.tmp'),
							serveStatic('app')
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							serveStatic('dist')
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
			}
		},
		clean: {
			dist: ['.tmp', 'dist/*'],
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'app/scripts/{,*/}*.js',
				'app/scripts/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},
		jasmine: {
			pivotal: {
				src: 'app/scripts/*.js',
				options: {
				  specs: 'test/spec/*.js',
				}
			}
		},
		sass: {
			options: {
			  sourceMap: true,
			  includePaths: ['app/bower_components']
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: ['*.{scss,sass}'],
					dest: '.tmp/styles',
					ext: '.css'
				}]
			},
			server: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: ['*.{scss,sass}'],
					dest: '.tmp/styles',
					ext: '.css'
				}]
			}
		},
		useminPrepare: {
			html: 'app/index.html',
			options: {
				dest: 'dist'
			}
		},
		usemin: {
			html: ['dist/{,*/}*.html'],
			css: ['dist/styles/{,*/}*.css'],
			options: {
				dirs: ['dist']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: 'dist/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'dist/styles/style.css': [
						'.tmp/styles/{,*/}*.css',
						'app/styles/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {},
				files: [{
					expand: true,
					cwd: 'app',
					src: '*.html',
					dest: 'dist'
				}]
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'app',
					dest: 'dist',
					src: [
						'*.{ico,txt}',
						'images/{,*/}*.{webp,gif}',
						'styles/fonts/{,*/}*.*'
					]
				}]
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'dist/scripts/{,*/}*.js',
						'dist/styles/{,*/}*.css',
						// 'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
						'dist/styles/fonts/{,*/}*.*'
					]
				}
			}
		}
	});


	grunt.registerTask('serve', function (target) {

		if (target === 'dist') {
			return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'sass:server',
			'connect:livereload',
			'open:server',
			'watch'
		]);
	});

	grunt.registerTask('test',[
		'jasmine'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'sass:dist',
		'useminPrepare',
		'imagemin',
		'htmlmin',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'rev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);

}
