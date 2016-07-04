import 'babel-polyfill';
import Promise from 'bluebird';
global.Promise = Promise;

import gulp from 'gulp';

import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';

const sources = 'src/**/*.js';
const tests = 'tests/**/*.js';

gulp.task('lint', () => gulp.src([sources, tests])
  .pipe(eslint())
);

gulp.task('test', ['lint'], () => gulp.src([tests])
  .pipe(mocha())
);

gulp.task('compile', ['lint'], () => gulp.src([sources])
  .pipe(babel())
  .pipe(gulp.dest('dist'))
);

gulp.task('default', ['test', 'compile']);
