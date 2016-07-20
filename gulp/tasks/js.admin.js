'use strict';

module.exports = function() {
  $.gulp.task('js.admin', function() {
    return $.gulp.src($.path.admin)
      .pipe($.gp.concat('admin.js'))
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};