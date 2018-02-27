'use-strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var maps = require('gulp-sourcemaps');
var del = require('del');
var shrinkIMG = require('gulp-imagemin');

gulp.task('concatJS', function(){
   return gulp.src(['js/**/*.js'])
   .pipe(maps.init())
   .pipe(concat('app.js'))
   .pipe(maps.write('./'))
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
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'))
});

gulp.task('miniCSS', ['compileCSS'], function(){
    return gulp.src('css/global.css')
    .pipe(minifyCSS())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('styles', ['miniCSS']);

gulp.task('images', function(){
    return gulp.src(['images/*'])
    .pipe(shrinkIMG())
    .pipe(gulp.dest('dist/content'))
});

gulp.task('build', ['clean','scripts','styles','images'], function(){
    return gulp.src([
        'index.html',
        'icons/**/*'
    ], {base: './'})
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', function(){
    del([
        'js/app*',
        'dist/**/*',
        'css'
    ]);
});