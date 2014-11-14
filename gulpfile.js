var gulp = require('gulp');
var args = require('yargs').argv;
var bump = require('gulp-bump');
var del = require('del');
var karma = require('gulp-karma');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('clean', function (cb) {
    del(['dist/**/*'], cb);
});

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

gulp.task('compress', function () {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('test', function () {
    return gulp.src('dist/angular-steps.js')
        .pipe(karma({
            configFile: 'karma.conf.js'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('bump', function () {
    return gulp.src('*.json')
        .pipe(bump({type: args.type}))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['clean'], function () {
    gulp.start('scss', 'less', 'css', 'copy', 'compress', 'test');
});
