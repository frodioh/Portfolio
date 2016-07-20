'use strict';

module.exports = function() {
  $.gulp.task('clean.server', function(cb) {
    return $.rimraf('./Server/site/assets', cb);
  });
};
