const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Static server
function server() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

function reload() {
  browserSync.reload();
}

function css(){
  return gulp.src('./samples/**/*.scss')
    .pipe(gulpSass({
      outputStyle: 'expanded'
    }).on('error', gulpSass.logError))
    .pipe(gulp.dest('./samples'))
    .pipe(browserSync.stream());
}

function watch() {
  gulp.watch(['./samples/**/*.scss'], css);
  gulp.watch('**/*.html', reload)
}

exports.default = gulp.series(css, gulp.parallel(server, watch));
