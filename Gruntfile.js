module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            target: {
                options: {
                    paths: ['less, less/custom']
                },
                files: {
                    'css/styles.css': 'less/bootstrap.less'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            main: {
                files: {
                    'js/main.min.js': ['js/main.js'],
                    'js/custom.min.js': ['js/custom.js']
                }
            },
            modernizr: {
                files: {
                    'js/modernizr-custom.min.js': ['js/modernizr-custom.js']
                }
            }
        },
        watch: {
            lessfiles: {
                files: ['less/**'],
                tasks: ['less'],
                options: {
                    debounceDelay: 50
                }
            },
            cssfiles: {
                files: ['css/*.css', '!css/*.min.css'],
                tasks: ['cssmin'],
                options: {
                    debounceDelay: 50
                }
            },
            jsfiles: {
                files: ['js/*.js', '!js/*.min.js'],
                tasks: ['uglify'],
                options: {
                    debounceDelay: 50
                }
            }
        },
        browserSync: {
            development: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        'js/*.js',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            },
            production: {
                bsFiles: {
                    src : [
                        'css/*min.css',
                        'js/*min.js',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('livesyncdevelopment', ['browserSync:development', 'watch:lessfiles']);
    grunt.registerTask('livesyncproduction', ['browserSync:production', 'watch']);

}