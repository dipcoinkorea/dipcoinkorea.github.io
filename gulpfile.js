// Less configuration
var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
//var tsProject = ts.createProject('tsconfig.json');

gulp.task('less', function() {
    gulp.src('./less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
    }
);

gulp.task('css', function() {
    gulp.src('./css/**/*.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('ts', function() {
    gulp.src('scripts/**/*.ts')
		.pipe(ts({
            out: 'output.js'    
        }))
		.pipe(gulp.dest('scripts/js'));
});

gulp.task('js', function() {
    gulp.src(['./scripts/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())    
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./scripts/js'));
});

gulp.task('default', ['less', 'css', 'ts', 'js'], function() {
    gulp.watch('./less/**/*.less', ['less']);
    gulp.watch('./css/**/*.css', ['css']);
    gulp.watch('./scripts/**/*.ts', ['ts']);
    gulp.watch('./scripts/**/*.js', ['js']);
});