module.exports = function(grunt) {

  grunt.initConfig({
  
    watch: {
      css: {
        files: 'dev/scss/iziui/scss/**/*.scss', 
        tasks: ['sass', 'postcss', 'cssmin']
      },
      
      js: {
        files: 'dev/scripts/**/*.js',
        tasks: ['concat', 'uglify']
      },
      
    },

    sass: {
      dev: {
        files: {
          'dist/css/main.css' : 'dev/scss/iziui/scss/main.scss'
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 2 versions']})
        ]
      },
      dist: {
        src: 'dist/css/main.css',
        dest: 'dist/css/main-prefixed.css'
      }
    },

    cssmin: {
      build: {
        src: 'dist/css/main-prefixed.css',
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
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};



