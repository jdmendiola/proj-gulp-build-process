'use-strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('testing', function(){
    console.log('gulp test');
});

gulp.task('concatenate', function(){
   return gulp.src(['js/**/*.js']) 
   .pipe(concat('app.js'))
   .pipe(gulp.dest('js'))
});

gulp.task('minify', ['concatenate'], function(){
    return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('clean', function(){
    del([
        'js/app*',
        'js/app.*.js',
        'dist'
    ]);
});