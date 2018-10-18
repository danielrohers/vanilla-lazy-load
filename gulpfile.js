const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const paths = {
  src: 'src/*.js',
  dist: 'dist'
};

gulp.task('clean', () => del(['dist']));

gulp.task('uglify', () => {
  return gulp.src(paths.src)
    .pipe(concat('vanilla-lazy-load.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('oridinal', () => {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dist));
})

gulp.task('dist', gulp.series('clean', gulp.parallel('uglify', 'oridinal')))
