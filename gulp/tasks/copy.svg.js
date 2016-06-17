'use strict';

module.exports = function() {
  $.gulp.task('copy.svg', function() {
    return $.gulp.src('./src/icons/*.svg', { since: $.gulp.lastRun('copy.svg') })
      .pipe($.gulp.dest($.config.root + '/assets/icons'));
  });
};