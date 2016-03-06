'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  defaultAssets = require('./config/assets/default'),
  testAssets = require('./config/assets/test'),
  testConfig = require('./config/env/test'),
  fs = require('fs'),
  path = require('path');

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      test: {
        NODE_ENV: 'test'
      },
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'client/dist/{,*/}*',
            '!client/dist/.git*'
          ]
        }]
      }
    },
    useminPrepare: {
      html: ['client/index.html'],
      options: {
        dest: 'client/dist',
        src: 'client'
      }
    },
    watch: {
      serverViews: {
        files: defaultAssets.server.views,
        options: {
          livereload: true
        }
      },
      serverJS: {
        files: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS),
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientViews: {
        files: 'client/module/**/*.html',
        options: {
          livereload: true
        }
      },
      clientJS: {
        files: 'client/module/**/*.js',
        tasks: ['jshint', 'injector'],
        options: {
          livereload: true
        }
      },
      clientCSS: {
        files: 'client/module/**/*.css',
        tasks: ['csslint', 'injector'],
        options: {
          livereload: true
        }
      },
      clientSCSS: {
        files: defaultAssets.client.sass,
        tasks: ['sass', 'csslint', 'injector'],
        options: {
          livereload: true
        }
      },
      clientLESS: {
        files: defaultAssets.client.less,
        tasks: ['less', 'csslint', 'injector'],
        options: {
          livereload: true
        }
      },
      bowerLibrary: {
        files: 'client/lib/**/*',
        tasks: ['wiredep'],
        options: {
          livereload: true
        }
      },
      index:{
        files: 'client/index.html',
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html',
          watch: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
        }
      }
    },
    concurrent: {
      default: ['nodemon', 'watch'],
      debug: ['nodemon', 'watch', 'node-inspector'],
      options: {
        logConcurrentOutput: true
      }
    },
    jshint: {
      all: {
        src: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e),
        options: {
          jshintrc: true,
          node: true,
          mocha: true,
          jasmine: true
        }
      }
    },
    eslint: {
      options: {},
      target: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e)
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: defaultAssets.client.css
      }
    },
    ngAnnotate: {
      production: {
        files:
          [{
            expand: true,
            cwd: '.tmp/concat',
            src: '*/**.js',
            dest: '.tmp/concat'
          }]
      }
    },
    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          addRootSlash: false,
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->',
          sort: function(a, b) {
            return a.split('/').length - b.split('/').length;
          },
          ignorePath:'client'
          //transform: function(file) {
          //  console.log(file)
          //}
        },
        files: {
          'client/index.html': [
            [
              'client/config.js',
              'client/init.js',
              'client/module/**/*.js']
          ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          addRootSlash: false,
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->',
          sort: function(a, b) {
            return (a.indexOf('reset')>0)? -1: 1;
          },
          ignorePath:'client'
        },
        files: {
          'client/index.html': [
            'client/module/**/*.css'
          ]
        }
      }
    },
    wiredep: {
      target: {
        src: [
          'client/index.html'
        ],
        // Optional
        options: {
          cwd: '',
          directory: 'client/lib',
          dependencies: true,
          devDependencies: false,
          overrides: {}
        }
      }
    },
    uglify: {
      production: {
        options: {
          mangle: false
        },
        files: {
          'client/dist/application.min.js': 'client/dist/application.js'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'client/dist/application.min.css': defaultAssets.client.css
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          src: defaultAssets.client.sass,
          ext: '.css',
          rename: function (base, src) {
            return src.replace('/scss/', '/css/');
          }
        }]
      }
    },
    less: {
      dist: {
        files: [{
          expand: true,
          src: defaultAssets.client.less,
          ext: '.css',
          rename: function (base, src) {
            return src.replace('/less/', '/css/');
          }
        }]
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 1337,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': true,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    },
    mochaTest: {
      src: testAssets.tests.server,
      options: {
        reporter: 'spec',
        timeout: 10000
      }
    },
    mocha_istanbul: {
      coverage: {
        src: testAssets.tests.server,
        options: {
          print: 'detail',
          coverage: true,
          require: 'test.js',
          coverageFolder: 'coverage/server',
          reportFormats: ['cobertura','lcovonly'],
          check: {
            lines: 40,
            statements: 40
          }
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    protractor: {
      options: {
        configFile: 'protractor.conf.js',
        noColor: false,
        webdriverManagerUpdate: true
      },
      e2e: {
        options: {
          args: {} // Target-specific arguments
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            'client/dist/app/*.js',
            'client/dist/app/*.css',
            'client/dist/fonts/*',
            'client/dist/img/*'
          ]
        }
      }
    },
    usemin: {
      html: ['client/dist/index.html', 'client/dist/module/**/*/*.html'],
      css: ['client/dist/app/{,*/}*.css'],
      options: {
        assetsDirs: ['client/dist/**/']
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'client/dist',
          src: ['*.html', 'module/**/*.html'],
          dest: 'client/dist'
        }]
      }
    },
    copy: {
      localConfig: {
        src: 'config/env/local.example.js',
        dest: 'config/env/local-development.js',
        filter: function () {
          return !fs.existsSync('config/env/local-development.js');
        }
      },
      html: {
        options: {
          process: function(content) {
            return content.replace(/module.{0,}img/g, 'img');
          }
        },files: [{
          expand: true,
          dot: true,
          cwd: './client',
          dest: './client/dist',
          src: [
            'module/**/*.html',
            'index.html'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          flatten: true,
          dest: './client/dist/fonts',
          src: ['./client/lib/font-awesome/fonts/*'],
          filter: 'isFile'
        },{
          expand: true,
          flatten: true,
          dest: './client/dist/img',
          src: ['./client/module/**/*.{png,jpg,jpeg,gif,webp,svg}']
        }]
      }
    }
  });

  grunt.event.on('coverage', function(lcovFileContents, done) {
    // Set coverage config so karma-coverage knows to run coverage
    testConfig.coverage = true;
    require('coveralls').handleInput(lcovFileContents, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-protractor-coverage');

  // Make sure upload directory exists
  grunt.task.registerTask('mkdir:upload', 'Task that makes sure upload directory exists.', function () {
    // Get the callback
    var done = this.async();

    grunt.file.mkdir(path.normalize(__dirname + '/modules/users/client/img/profile/uploads'));

    done();
  });

  // Connect to the MongoDB instance and load the models
  grunt.task.registerTask('mongoose', 'Task that connects to the MongoDB instance and loads the application models.', function () {
    // Get the callback
    var done = this.async();

    // Use mongoose configuration
    var mongoose = require('./config/lib/mongoose.js');

    // Connect to database
    mongoose.connect(function (db) {
      done();
    });
  });

  // Drops the MongoDB database, used in e2e testing
  grunt.task.registerTask('dropdb', 'drop the database', function () {
    // async mode
    var done = this.async();

    // Use mongoose configuration
    var mongoose = require('./config/lib/mongoose.js');

    mongoose.connect(function (db) {
      db.connection.db.dropDatabase(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully dropped db: ', db.connection.db.databaseName);
        }
        db.connection.db.close(done);
      });
    });
  });

  grunt.task.registerTask('server', 'Starting the server', function () {
    // Get the callback
    var done = this.async();

    var path = require('path');
    var app = require(path.resolve('./config/lib/app'));
    var server = app.start(function () {
      done();
    });
  });


  // Lint project files and minify them into two production files.
  grunt.registerTask('build', [
    'env:dev',
    'clean:dist',
    'useminPrepare',
    'concat',
    'ngAnnotate:production',
    'copy:html',
    'copy:dist',
    'uglify',
    'cssmin',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  // Run the project in development mode
  grunt.registerTask('default', [
    'env:dev',
    'lint',
    'mkdir:upload',
    'copy:localConfig',
    'concurrent:default',
    'wiredep',
    'injector',
    'watch'
  ]);
  
  
  // Lint CSS and JavaScript files.
  grunt.registerTask('lint', ['sass', 'less', 'jshint', 'csslint']);



  // Run the project tests
  grunt.registerTask('test', ['env:test', 'lint', 'mkdir:upload', 'copy:localConfig', 'server', 'mochaTest', 'karma:unit', 'protractor']);
  grunt.registerTask('test:server', ['env:test', 'lint', 'server', 'mochaTest']);
  grunt.registerTask('test:client', ['env:test', 'lint', 'karma:unit']);
  grunt.registerTask('test:e2e', ['env:test', 'lint', 'dropdb', 'server', 'protractor']);
  // Run project coverage
  grunt.registerTask('coverage', ['env:test', 'lint', 'mocha_istanbul:coverage', 'karma:unit']);



  // Run the project in debug mode
  grunt.registerTask('debug', ['env:dev', 'lint', 'mkdir:upload', 'copy:localConfig', 'concurrent:debug']);

  // Run the project in production mode
  grunt.registerTask('prod', ['build', 'env:prod', 'mkdir:upload', 'copy:localConfig', 'concurrent:default']);
};
