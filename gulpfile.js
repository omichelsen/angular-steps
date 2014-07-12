var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('copy', function () {
    gulp.src('angular-steps.less')
        .pipe(rename("_angular-steps.scss"))
        .pipe(gulp.dest('.'));
});

gulp.task('less', function () {
    gulp.src('*.less')
        .pipe(less())
        .pipe(gulp.dest('.'));
});

gulp.task('css', function () {
    gulp.src('angular-steps.css')
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('.'));
});

gulp.task('compress', function() {
    gulp.src('angular-steps.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('.'))
});

gulp.task('default', ['less'], function () {
    gulp.start('css', 'copy', 'compress');
});
