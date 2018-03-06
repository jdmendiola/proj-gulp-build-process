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
var webserver = require('gulp-webserver');
var runSequence = require('run-sequence');

gulp.task('concatJS', function(){
   return gulp.src(['js/**/*.js'])
   .pipe(maps.init())
   .pipe(concat('app.js'))
   .pipe(maps.write('./'))
   .pipe(gulp.dest('js'))
});

gulp.task('miniJS', function(){
    return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('scripts', function(){
    return runSequence(
        'concatJS',
        'miniJS'
    );
});

gulp.task('compileCSS', function(){
    return gulp.src(['./sass/*.scss'])
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'))
});

gulp.task('watchSASS', function(){
    return gulp.watch(['./sass/*.scss', './sass/**/**/*.sass', './sass/**/*.sass', './sass/*.sass'], ['styles']);
});

gulp.task('miniCSS', function(){
    return gulp.src('css/global.css')
    .pipe(minifyCSS())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('styles', function(){
    return runSequence(
        'compileCSS',
        'miniCSS'
    );
});

gulp.task('images', function(){
    return gulp.src(['images/*'])
    .pipe(shrinkIMG())
    .pipe(gulp.dest('dist/content'))
});

gulp.task('serve', ['watchSASS'], function(){
    return gulp.src('./')
    .pipe(webserver({
        livereload: true
    }));
});

gulp.task('build', ['clean'], function(){

    return runSequence(
        'scripts',
        'styles',
        'images',
        function(){
            return gulp.src([
                'index.html',
                'icons/**/*'
            ], {base: './'})
            .pipe(gulp.dest('dist'))
        }
    );

});

gulp.task('clean', function(){
    return del([
        'js/app*',
        'dist',
        'css'
    ]);
});

gulp.task('default', function(){
    runSequence('build', 'serve');
});