module.exports = function (grunt) {  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {
          'components/css/main.css' : 'components/sass/style.scss'
        }
      }
    }, // sass
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      files: {
        expand: true,
        flatten: true,
        src: 'components/css/*.css',
        dest: 'builds/www/css/'
      }
    }, // autoprefixer
    uglify: {
      target: {
        files: {
          'builds/www/js/main.js': ['components/js/**/*.js']
        } // files
      } // my_target
    }, // uglify
    watch: {
      script: {
        files: ['components/js/*.js'],
        tasks: ['uglify']
      }, // script
      css: {
        files: 'components/sass/**/*.scss',
        tasks: ['sass', 'autoprefixer']
      }
    }, // watch
    uncss: {
      dist: {
        files: {
          'builds/www/css/main.css' : ['builds/www/*.html']
        }
      } // dist
    } // uncss

  }); // initConfig

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-uncss');

  grunt.registerTask('default', ['watch', 'uncss']);
}; // wrapper function