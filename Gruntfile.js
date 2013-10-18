'use strict';

//TODO Wathcer sul server per le modifiche ai files?

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: [
          '2-fish.js'
        ]
      },
      test: {
        src: ['spec/**/*.js']
      }
    },
    jasmine : {
      src : '2-fish.js',
      options : {
        specs : 'spec/**/*.js'
      }
    },
    uglify: {
      options: {
        report: 'gzip'
      },
      minifyTarget: {
        files: {
          'dist/2-fish.min.js': ['2-fish.js']
        }
      }
    }
  });

  // NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default tasks (when type grunt on terminal).
  grunt.registerTask('default', [
    'jshint',
    'jasmine'
  ]);

  grunt.registerTask('min', [
    'uglify'
  ]);
};
