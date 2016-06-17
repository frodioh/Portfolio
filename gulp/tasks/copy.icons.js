'use strict';

module.exports = function() {
  $.gulp.task('copy.icons', function() {
    return $.gulp.src('./src/icons/**/*.*', { since: $.gulp.lastRun('copy.icons') })
      .pipe($.gulp.dest($.config.root + '/assets/icons'));
  });
};