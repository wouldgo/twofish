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
    }
  });

  // NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default tasks (when type grunt on terminal).
  grunt.registerTask('default', [
    'jshint',
    'jasmine'
  ]);
};
