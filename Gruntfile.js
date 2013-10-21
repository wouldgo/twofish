'use strict';

module.exports = function(grunt) {

  var banner = ['/*!',
    ' * Twofish (ECB and CBC) javascript implementation v<%= pkg.version %>',
    ' *',
    ' * Released under the MIT license',
    ' * www.opensource.org/licenses/MIT',
    ' *',
    ' * <%= grunt.template.today("yyyy-mm-dd") %>',
    ' */\n\n'
  ].join('\n');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
        report: 'gzip',
        banner: banner
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
    'jasmine',
    'uglify'
  ]);
};
