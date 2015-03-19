var gulp = require('gulp');
var args = require('yargs').argv;
var bump = require('gulp-bump');
var del = require('del');
var header = require('gulp-header');
var karma = require('karma').server;
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var pkg = require('./package.json');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @author <%= pkg.author %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

gulp.task('clean', function (cb) {
    del(['dist/**/*'], cb);
});

gulp.task('copy', function () {
    gulp.src('src/*.*')
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    return gulp.src('src/*.js')
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('header', ['compress'], function () {
    return gulp.src('dist/*.js')
        .pipe(header(banner, {pkg: pkg}))
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
        .pipe(gulp.dest('dist'));
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('bump', function () {
    return gulp.src('*.json')
        .pipe(bump({type: args.type}))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['clean', 'test'], function () {
    gulp.start('scss', 'less', 'css', 'copy', 'js', 'compress', 'header');
});
