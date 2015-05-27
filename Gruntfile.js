module.exports = function(grunt) {

    // loading needed npm modules
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-karma');

    // main config object
    grunt.initConfig({
        // task for watching on changed files
    
        watch: {
            // tests: {
            //     files: ['karma.conf.js', 'public/js/**/*.js', 'public/karma/**/*.js'],
            //     tasks: ['karma'],
            //     options: {
            //         debounceDelay: 100,
            //         interrupt: true
            //     }
            // },
            styles: {
                files: ['src/**/*.less'],
                tasks: ['less'],
                options: {
                    debounceDelay: 1,
                    interrupt: true
                }
            },
            config: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },

        // task for running unit tests
        // karma: {
        //     unit: {
        //         singleRun: true,
        //         configFile: 'karma.conf.js'
        //     }
        // },

        connect:{
            server:{
                options:{
                    port: 8333,
                    base: '.',
                    middleware: function (connect, options, middlewares) {
                        var 
                            fs = require('fs'),
                            path = require('path'),
                            support = ['POST', 'PUT', 'DELETE', 'GET']
                        ;

                        middlewares.unshift(function (req, res, next) {
                            var 
                                reqMethod = req.method.toUpperCase(),
                                isJson,
                                filepath, 
                                fileCont,
                                prevDate, nextDate
                            ;

                            filepath = path.join(options.base[0], req._parsedUrl.pathname);
                            isJson = /\.json$/gi.test(filepath);
                            
                            /*if(isJson){
                                prevDate = new Date();

                                while ( !nextDate || nextDate-prevDate < 100 ){
                                    nextDate = new Date();
                                }
                            }*/

                            if ( fs.existsSync(filepath) && fs.statSync(filepath).isFile() && isJson ) {
                                    fileCont = fs.readFileSync(filepath);
                                    // fileCont = mockServerProcess.processFileContent(reqMethod, filepath, fileCont, req);
                                }

                            if ( support.indexOf(reqMethod) != -1 && fileCont && isJson ) {
                                res.setHeader('Content-Type', 'application/json');
                                return res.end(fileCont);
                            }

                            return next();
                        });

                        return middlewares;
                    }
                }
            }
        },

        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 1
                },
                files: {
                    "src/index.css": "src/index.less" // destination file and source file
                }    
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 1
                },
                files: {
                    "src/index.css": "src/index.less" // destination file and source file
                }
            }
        }
    });

    // the default task, that is run after typing "grunt" in command line, used for developing
    grunt.registerTask('default', [
        'connect:server',
        'less:development',
        // 'karma',
        'watch'
    ]);

    //task, that is run after typing "grunt prod" in command line, used for production
    grunt.registerTask('prod', [
        // 'karma',
        'less:production'
    ]);

};