/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
import gulp from 'gulp';
import watch from 'gulp-watch';
import concatCss from 'gulp-concat-css';
import bS from 'browser-sync';

const browserSync = bS.create();

gulp.task('watch', liveEdit);


function liveEdit(done) {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './ui',
    },
  });

  // Reload browser upon changes to any html
  watch('./ui/*.html', reloadBrowser);
  watch('./ui/pages/**/*.html', reloadBrowser);

  // Inject css into browser when change occurs to any css file
  watch('./ui/assets/styles/**/*.css', gulp.series(bundleCss, injectCssToBrowser));
  done();
}

// FUNCTIONS
function bundleCss() {
  return gulp.src('ui/assets/styles/main.css')
    .pipe(concatCss('main.bundle.css'))
    .pipe(gulp.dest('ui/assets/styles/'));
}

function injectCssToBrowser() {
  return gulp.src('./ui/assets/styles/main.bundle.css').pipe(browserSync.stream());
}

function reloadBrowser() {
  browserSync.reload();
}
