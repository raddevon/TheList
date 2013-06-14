var scripts = ['js/jquery-1.9.1.min.js', 'js/jquery.cookie.js', 'js/**/*.js', '!js/scripts.js'];

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        force: true
      },
      all: scripts + ['!js/jquery-1.9.1.min.js', '!js/jquery.cookie.js']
    },

    concat: {
      dist: {
        src: scripts,
        dest: 'js/scripts.js'
      }
    },

    uglify: {
      min: {
        files: {
          'js/scripts.js': ['js/scripts.js']
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      },
      production: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production',
          outputStyle: 'compressed'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: scripts,
        tasks: ['jshint']
      },
      styles: {
        files: ['sass/**/*.{sass,scss}'],
        tasks: ['compass']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'compass:dev', 'watch']);
  grunt.registerTask('build', ['jshint', 'compass:production', 'concat', 'uglify']);

};