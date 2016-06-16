var gulp  = require('gulp');
var zip   = require('gulp-zip');
var merge = require('event-stream').merge;
var del   = require('del');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
    runSequence('prepare', 'zip', 'clean', cb);
});

gulp.task('prepare', function() {
    return merge(
        gulp.src(['manifest.json', 'background.js', 'content.js'])
            .pipe(gulp.dest('tmp/')),
        gulp.src('img/icon-*')
            .pipe(gulp.dest('tmp/img/'))
    );
});

gulp.task('zip', function() {
    return gulp.src('tmp/**')
        .pipe(zip('CanonicalUrlDetector.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function(cb) {
    del(['tmp/', 'CanonicalUrlDetector/'], cb);
});
