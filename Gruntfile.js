module.exports = function (grunt) {
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
	/*			options: {
				style: 'expanded',
				sourcemap: false
			},*/
				files: {
					'dist/css/main.css': 'test/scss/main.scss',
					'dist/elastic-list.css': './elastic-list.scss'
				}
			}
		},

		copy: {
			main: {
				files: [{
					cwd: 'test/vendors/bootstrap-sass/assets/fonts',
					src: '**/*', // copy all files and subfolders
					dest: 'dist/fonts', // destination folder
					expand: true // required when using cwd
                }, {
					cwd: 'test/',
					src: '**/*', // copy all files and subfolders
					dest: 'dist/', // destination folder
					expand: true // required when using cwd
                }]
			}
		},

		connect: {
			server: {
				options: {
					hostname: '0.0.0.0',
					port: 8888,
					base: "dist",
					livereload: true
				}
			}
		},

		open: {
			all: {
				path: 'http://localhost:8888'
			}
		},

		uglify: {
			options: {
				mangle: false,
				sourceMap: false
			},
			build: {
				files: [{
					expand: true,
					src: '*.js',
					dest: 'dist',
					ext: '.js',
					extDot: 'last'
                }]
			}
		},

		watch: {
			main: {
				options: {
					livereload: true
				},
				files: ['test/**/*', '*.js', '*.scss'],
				tasks: ['default']
			}
		},
	});

	// Default task.
	grunt.registerTask('default', ['sass', 'uglify', 'copy']);
	grunt.registerTask('serve', ['default', "open", 'connect:server', 'watch']);
};
