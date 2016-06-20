const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const Cache = require('gulp-file-cache');

const cache = new Cache();

gulp.task('build', () => gulp.src('src/**/*.js')
  .pipe(cache.filter())
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write())
  .pipe(cache.cache())
  .pipe(gulp.dest('dist'))
);

gulp.task('test', ['build'], () => gulp.src('dist/tests/**/*.js')
  .pipe(mocha())
);

gulp.task('watch', ['build'], () => gulp.watch('src/**/*.js', ['build', 'test']));

gulp.task('default', ['build']);
