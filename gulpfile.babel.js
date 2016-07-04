import 'babel-polyfill';
import 'source-map-support';

import gulp from 'gulp';

import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import sourcemaps from 'gulp-sourcemaps';

const sources = 'src/**/*.js';
const tests = 'tests/**/*.js';

gulp.task('lint', () => gulp.src([sources, tests])
  .pipe(eslint())
);

gulp.task('test', ['lint'], () => gulp.src([tests])
  .pipe(mocha())
);

gulp.task('compile', ['lint'], () => gulp.src([sources])
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'))
);

gulp.task('default', ['test', 'compile']);
