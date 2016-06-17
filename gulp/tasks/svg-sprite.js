'use strict';

module.exports = function() {
  $.gulp.task('svgSpriteBuild', function () {
    return $.gulp.src('./src/icons/*.svg')
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite({
          mode: "symbols",
          preview: false,
          selector: "icon-%f",
          svg: {
            symbols: 'symbol_sprite.html'
          }
        }
      ))
      .pipe(gulp.dest($.config.root + '/assets/i/'));
});
};