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
        tasks: ['concat', 'babel', 'uglify'],
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
        dest: 'dev/built/bundle.js'
      }
    },

    babel : {
      options: {
        sourceMap: true,
        presets: ['env']
      },
      dist: {
        files: {
          'dev/built/bundle-babel.js' : 'dev/built/bundle.js'
        }
      }
    },

    uglify: {
      build: {
        files: {
          'dist/scripts/built.min.js': ['dev/built/bundle-babel.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'babel', 'uglify']);

};



