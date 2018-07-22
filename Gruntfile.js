module.exports = function(grunt) {

  grunt.initConfig({
  
    watch: {
      css: {
        files: 'dev/scss/**/*.scss', 
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true,
        }
      },
      
      js: {
        files: 'dev/scripts/**/*.js',
        tasks: ['concat', 'uglify'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: 'index.html',
        options: {
          livereload: true,
        }
      }
      
    },

    sass: {
      dev: {
        files: {
          'dist/css/main.css' : 'dev/scss/main.scss'
        }
      }
    },

    cssmin: {
      build: {
        src: 'dist/css/main.css',
        dest: 'dist/css/main.min.css'
      }    
    },

    concat: {
      options: {
        separator: '\n\n\n'
      },
      dist: {
        src: ['dev/scripts/*.js'],
        dest: 'dist/scripts/built.js'
      }
    },

    uglify: {
      build: {
        files: {
          'dist/scripts/built.min.js': ['dist/scripts/built.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};



