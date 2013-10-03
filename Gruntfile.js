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
      }//,
      //test: {
      //  src: ['test/**/*.js']
      //}
    }
  });

  // NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default tasks (when type grunt on terminal).
  grunt.registerTask('default', [
    'jshint'
  ]);
};
