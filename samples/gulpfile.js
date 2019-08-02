const gulp = require('gulp');
const gulpSass = require('gulp-sass');

function css(){
  return gulp.src('./css/**/*.scss')
    .pipe(gulpSass({
      outputStyle: 'expanded'
    }).on('error', gulpSass.logError))
    .pipe(gulp.dest('./css/'));
}

function watch() {
    gulp.watch(['./css/**/*.scss'], css);
}

exports.default = gulp.series(css, watch);
