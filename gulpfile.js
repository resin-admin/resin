// Include required bits
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    concat = require('gulp-concat');

// Concatenate & Minify Stylus
gulp.task('styl', function() {
  return gulp.src('./assets/styl/admin.styl')
    .pipe(stylus({errors: false}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/css'));
});

// Concatenate & Minify JS
gulp.task('js', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(order([
      'admin.js',
      '*.js'
    ]))
    .pipe(concat('admin.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('./assets/js/**/*.js', ['js']);
  gulp.watch('./assets/styl/**/*.styl', ['styl']);
});

// Default Task
gulp.task('default', ['styl', 'js', 'watch']);
