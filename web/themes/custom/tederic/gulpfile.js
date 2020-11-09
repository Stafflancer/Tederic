var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('sass/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('css'))
});

// Added autoprefixer for css style
gulp.task('autoprefix', () =>
  gulp.src('css/main.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'iOS 8'],
      cascade: false
  }))
  .pipe(gulp.dest('css'))
);

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', gulp.series('sass'));
});
