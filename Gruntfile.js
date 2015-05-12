module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: false
                },
                files: {
                    'test/css/main.css': 'test/scss/main.scss',
                    'elastic-list.css' :'elastic-list.scss'
                }
            }
        },
        copy: {
            main: {
                files: [{
                    cwd: 'test/vendors/bootstrap-sass/assets/fonts',
                    src: '**/*', // copy all files and subfolders
                    dest: 'test/fonts', // destination folder
                    expand: true // required when using cwd
                }]
            }
        }
    });
    // Default task.
    grunt.registerTask('default', [ 'sass', 'copy']);
};