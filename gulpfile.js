var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('copy', function () {
    gulp.src('src/*.*')
        .pipe(gulp.dest('dist'));
});

gulp.task('scss', function () {
    return gulp.src('src/*.less')
        .pipe(rename({
            prefix: '_',
            extname: '.scss'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
    return gulp.src('src/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ['less'], function () {
    return gulp.src('dist/*.css')
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['scss', 'less', 'css', 'copy', 'compress']);
