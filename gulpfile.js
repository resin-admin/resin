//-- Includes -----------------------------------------------------
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    jade = require('gulp-jade'),
    nodemon = require('gulp-nodemon'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat');

//-- Bower Dependencies -----------------------------------------------------
var bowerJsDependencies = [
  './vendor/jquery-autosize/jquery.autosize.js',
  './vendor/angular/angular.js',
  './vendor/jquery/dist/jquery.js',
  './vendor/chartjs/Chart.js'
];

var bowerCssDependencies = [
  './vendor/font-awesome/css/font-awesome.css',
  './vendor/animate.css/animate.css',
  './vendor/normalize.css/normalize.css'
];

//-- Concat & Minify Stylus -----------------------------------------------------
gulp.task('styl', function() {
  return gulp.src('./assets/styl/resin.styl')
    .pipe(stylus())
    .on("error", notify.onError(function (error) {
      return "Stylus error: " + error.message;
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/css'));
});

//-- Concat & Minify JS -----------------------------------------------------
gulp.task('js', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(order([
      'resin.js',
      '*.js'
    ]))
    .pipe(concat('resin.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

//-- Convert Jade to HTML -----------------------------------------------------
gulp.task('jade', function() {
  return gulp.src('./views/**/*.jade')
    .pipe(jade())
    .on("error", notify.onError(function (error) {
      return "Jade error: " + error.message;
    }))
    .pipe(gulp.dest('./dist/'));
});

//-- Manage vendor CSS -----------------------------------------------------
gulp.task('vendor-css', function() {
  return gulp.src(bowerCssDependencies)
  .pipe(concat('vendor.css'))
  .pipe(minify())
  .pipe(gulp.dest('./dist/css'));
});

//-- Manage vendor JS -----------------------------------------------------
gulp.task('vendor-js', function() {
  return gulp.src(bowerJsDependencies)
    .pipe(order([
      'jquery.js',
      '*.js'
    ]))
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

//-- Copy Font Awesome Fonts to the Dist Directory ---------------------------------------
gulp.task('fonts', function() {
  return gulp.src('./vendor/font-awesome/fonts/**/*.*')
    .pipe(gulp.dest('./dist/fonts'));
});

//-- Start local server -----------------------------------------------------
gulp.task('server', function() {
  nodemon({
    verbose: false,
    script: 'server.js',
    watch: ['source', 'server.js'],
    ext: 'js json',
    env: {
      NODE_ENV: 'development'
    }
  })
})

//-- Watch Files for Changes -----------------------------------------------------
gulp.task('watch', function() {
  gulp.watch('./views/**/*.jade', ['jade']);
  gulp.watch('./assets/js/**/*.js', ['js']);
  gulp.watch('./assets/styl/**/*.styl', ['styl']);
});

//-- Default Task -----------------------------------------------------
gulp.task('default', ['styl', 'js', 'jade', 'vendor-css', 'vendor-js', 'fonts', 'server', 'watch']);
