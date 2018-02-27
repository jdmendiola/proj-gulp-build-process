'use-strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var maps = require('gulp-sourcemaps');
var del = require('del');

gulp.task('concatJS', function(){
   return gulp.src(['js/**/*.js']) 
   .pipe(concat('app.js'))
   .pipe(gulp.dest('js'))
});

gulp.task('miniJS', ['concatJS'], function(){
    return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('scripts', ['miniJS']);

gulp.task('compileCSS', function(){
    return gulp.src('sass/global.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
});

gulp.task('miniCSS', ['compileCSS'], function(){
    return gulp.src('css/global.css')
    .pipe(minifyCSS())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('styles', ['miniCSS']);

gulp.task('clean', function(){
    del([
        'js/app*',
        'dist',
        'css'
    ]);
});