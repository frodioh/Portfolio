'use strict';

module.exports = function() {
  $.gulp.task('copy.template', function() {
    return $.gulp.src('./src/template/**/*.*', { since: $.gulp.lastRun('copy.template') })
      .pipe($.gulp.dest('./Server/site/template/'));
  });
};