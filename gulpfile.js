var gulp = require('gulp')

gulp.task('front-js', () => {
  var stream = gulp.src('./www/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(gulpBrowser.browserify())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/js-prod'))
    .pipe(notify({message: 'Frontend JS has been compiled'}))
  return stream
})

gulp.task('front-lib', () => {
  var stream = gulp.src('./www/js/libraries.js')
    .pipe(sourcemaps.init())
    .pipe(include())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/js-prod'))
    .pipe(notify({message: 'Frontend JS libraries have been compiled'}))
  return stream
})

gulp.task('js-watch', () => {
  gulp.start(['front-js', 'front-lib'])
  gulp.watch('./www/js/*.js', ['front-js'])
  gulp.watch('./www/js/libraries.js', ['front-lib'])
})

gulp.task('sass', () => {
  var stream = gulp.src('./www/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'safari 6', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'ios 7', 'android 4'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/css'))
    .pipe(notify({message: 'SCSS has been compiled'}))
  return stream
})

gulp.task('sass-watch', () => {
  gulp.start(['sass'])
  gulp.watch('./www/scss/*.scss', ['sass'])
})

gulp.task('default', () => {
  gulp.start(['sass-watch', 'js-watch'])
})
