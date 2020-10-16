const gulp = require('gulp');
const sass = require('../source');

gulp.task('default', () => gulp.src('fixtures/*.scss', {
    sourcemaps: true
  })
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest('results', {
    sourcemaps: '.'
  })));
