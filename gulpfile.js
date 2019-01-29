const gulp  = require('gulp');
const zip   = require('gulp-zip');
const del   = require('del');

// tasks
const prepare = gulp.parallel(
  () => gulp.src(['manifest.json', 'background.js', 'content.js'])
    .pipe(gulp.dest('tmp/')),
  () => gulp.src('img/icon-*')
    .pipe(gulp.dest('tmp/img/')),
  () => gulp.src('_locales/**')
    .pipe(gulp.dest('tmp/_locales/'))
);

const make = () => gulp.src('tmp/**')
  .pipe(zip('CanonicalUrlDetector.zip'))
  .pipe(gulp.dest('./'));

const clean = () => del(['tmp/', 'CanonicalUrlDetector/']);

gulp.task('build', gulp.series(prepare, make, clean));
