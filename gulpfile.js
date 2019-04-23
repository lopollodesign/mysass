'user strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var browserSync = require('browser-sync').create();

// Tarea para compilar sass
gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

// Optimizacion CSS
gulp.task('css-minify' , function(){
    var plugins = [
        autoprefixer,
        mqpacker,
        cssnano,
    ];
    return gulp.src('assets/css/styles.css')
        .pipe(postcss(plugins))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./assets/css'));
});

// Vigilar cambios css
gulp.task('default', function(){
  browserSync.init({
    server: './'
  });
  gulp.watch(['./**/*']).on('change' , browserSync.reload);
  gulp.watch(['./**/*.scss', './**/*.scss'], gulp.series('sass'));
  gulp.watch('assets/css/styles.css', gulp.series('css-minify'));
});