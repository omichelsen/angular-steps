var gulp = require('gulp');
var args = require('yargs').argv;
var bump = require('gulp-bump');
var del = require('del');
var header = require('gulp-header');
var Server = require('karma').Server;
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
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

gulp.task('clean', function () {
    return del(['dist/**/*']);
});

gulp.task('copy', ['clean'], function () {
    gulp.src('src/*.less')
        .pipe(gulp.dest('dist'));
});

gulp.task('js', ['clean', 'test'], function () {
    return gulp.src('src/*.js')
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', ['js'], function () {
    return gulp.src('dist/*.js')
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('scss', ['clean'], function () {
    return gulp.src('src/*.less')
        .pipe(rename({
            prefix: '_',
            extname: '.scss'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', ['clean'], function () {
    return gulp.src('src/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ['less'], function () {
    return gulp.src('dist/*.css')
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('bump', function () {
    return gulp.src('*.json')
        .pipe(bump({type: args.type}))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['scss', 'less', 'css', 'copy', 'js', 'compress']);

gulp.task('default', ['clean', 'test', 'build']);
