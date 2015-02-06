/*global module*/
(function setUp(module) {
  'use strict';

  module.exports = function exportingFunction(grunt) {

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
      'pkg': grunt.file.readJSON('package.json'),
      'confs': {
        'dist': 'dist',
        'config': 'config',
        'src': 'src',
        'spec': 'spec'
      },
      'eslint': {
        'options': {
          'config': '<%= confs.config %>/eslint.json'
        },
        'target': [
          'Gruntfile.js',
          '<%= confs.src %>/**/*.js',
          '<%= confs.spec %>/**/*.js'
        ]
      },
      'uglify': {
        'options': {
          'sourceMap': true,
          'preserveComments': false,
          'report': 'gzip',
          'banner': banner
        },
        'minifyTarget': {
          'files': {
            '<%= confs.dist %>/<%= pkg.name %>.min.js': [
              '<%= confs.src %>/<%= pkg.name %>.js'
            ]
          }
        }
      },
      'jasmine': {
        'ecb': {
          'src': '<%= confs.src %>/<%= pkg.name %>.js',
          'options': {
            'specs': '<%= confs.spec %>/**/ecb-*.js'
          }
        },
        'cbc': {
          'src': '<%= confs.src %>/<%= pkg.name %>.js',
          'options': {
            'specs': '<%= confs.spec %>/**/cbc-*.js'
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-eslint');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', [
      'eslint'
    ]);

    grunt.registerTask('test', [
      'eslint',
      'jasmine'
    ]);

    grunt.registerTask('prod', [
      'eslint',
      'uglify'
    ]);
  };
}(module));
