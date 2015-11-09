var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('minify', ['browserify'], function () {
  'use strict';
  return gulp.src('./dist/react-drag.js')
    .pipe(rename('ReactDrag.js'))
    .pipe(uglify())
    .pipe(rename('react-drag.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserify', function () {
  'use strict';
  return browserify(['./lib/react-drag.js'], {
      standalone: 'ReactDrag'
    })
    .external(['react', 'react-dom'])
    .bundle()
    .pipe(source('ReactDrag.js'))
    .pipe(buffer())
    .pipe(rename('react-drag.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['minify']);

