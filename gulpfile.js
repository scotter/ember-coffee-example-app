var gulp = require('gulp');
var coffee = require('gulp-coffee');
var livereload = require('gulp-livereload');

gulp.task('build', function() {
  gulp.src('./js/*.coffee')
  	.pipe(coffee())
    .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
  gulp.watch('./js/*.coffee', ['build']);
  var server = livereload();

  gulp.watch('./js/*.js').on('change', function(file) {
    server.changed(file.path);
  });

  gulp.watch('./*.html').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task('default', ['build', 'watch']);