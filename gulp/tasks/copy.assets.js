'use strict';

module.exports = function() {
  $.gulp.task('copy.assets', function() {
    return $.gulp.src('./dist/assets/**/*.*', { since: $.gulp.lastRun('copy.assets') })
      .pipe($.gulp.dest('./Server/site/assets/'));
  });
};