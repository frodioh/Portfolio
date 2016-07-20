'use strict';

module.exports = function() {
  $.gulp.task('clean.template', function(cb) {
    return $.rimraf('./Server/site/template', cb);
  });
};
