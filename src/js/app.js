$(document).ready(function() {
  
  $(function() { //прелоадер---------------------------------------
    var imgs = [],
        percents = 1;

    $('*').each(function() {
      var $this = $(this),
          img = $this.is('img'),
          background = $this.css('background-image');

      if (background != 'none') {
        var path = background.replace('url(','').replace(')','');
        if (path[0] === '"' || path[0] === '\'') {
          path = path.substr(1);
        }
        if (path[path.length-1] === '"' || path[0] === '\'') {
          path = path.substring(0,path.length-1);
        }
        if (path) {
          imgs.push(path);
        }
      }

      if (img) {
        var path = $this.attr('src');
        if (path) {
          imgs.push(path);
        }
      }
    });
    for (var i = 0; i < imgs.length; i++) {
      var image = $('<img>', {
        attr: {
          src: imgs[i]
        }
      });
      image.load(function() {
        setPercents(imgs.length, percents);
        percents++;
      });
    }

    function setPercents(total, current) {
      var percent = Math.ceil(current / total * 100);
      $('.preloader__text').text(percent + '%');
      if (percent >= 100) {
        $('.wrapper').css('display', 'block');
        $('.inner-wrapper').css('display', 'block');
        $('.preloader').css('display', 'none');
        setTimeout(function() {
          $('.flipper').removeClass('flipper--unload');
        }, 400);
      }
    }

  });

  $('.anchor-link').on('click', function(e) { //якорный переход---------
    e.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body, html').animate({
      scrollTop: top
    }, 1500);
  })

});

window.onload = function() {

  (function() {
    var card, form, authBtn, hamburger, menu, clickArea;
    if (document.getElementsByClassName("index-container")[0]) {
      card = document.getElementsByClassName("index-container")[0];
    }
    if (document.getElementsByClassName("login-form")[0]) {
      form = document.getElementsByClassName("login-form")[0];
    }
    if (document.getElementsByClassName("authorization-btn")[0]) {
      authBtn = document.getElementsByClassName("authorization-btn")[0];
    }
    if (document.getElementsByClassName("click-area")[0]) {
      clickArea = document.getElementsByClassName("click-area")[0];
    }
    if (document.getElementsByClassName("hamburger")[0]) {
      hamburger = document.getElementsByClassName("hamburger")[0];
    }
    if (document.getElementsByClassName("menu")[0]) {
      menu = document.getElementsByClassName("menu")[0];
    }

    if (authBtn) {
      clickArea.onclick = function() {
        card.classList.toggle("index-container--flip");
        authBtn.classList.toggle("authorization-btn--clicked");
        clickArea.classList.toggle("click-area--display");
      };
      authBtn.onclick = function() {
        card.classList.toggle("index-container--flip");
        authBtn.classList.toggle("authorization-btn--clicked");
        clickArea.classList.toggle("click-area--display");
      }
    }
    if (hamburger) {
      hamburger.onclick = function(e) {
        var list;
        if (document.getElementsByClassName("menu__list")[0]) {
          list = document.getElementsByClassName("menu__list")[0];
        }
        e.preventDefault();
        menu.classList.toggle("menu--active");
        if (hamburger.classList.contains('hamburger--transformed')) {
          list.classList.toggle('menu__list--active');
        } else {
          setTimeout(function() {
            list.classList.toggle('menu__list--active');
          }, 500);
        }
        hamburger.classList.toggle("hamburger--transformed")
      }
    }
  }());

  (function() {
  //------------------------
    var downBtn = $('.thumbnail.thumbnail--down'),
        upBtn = $('.thumbnail.thumbnail--up'),
        slide = $('.slider__current'),
        counterDown = 0,
        counterUp = 2,
        counterSlide = 1;
    
    downBtn.on('click', function() { //Слайдер вверх ---------------
      counterDown--;
      counterUp--;
      counterSlide--;
      var $this = $(this),
          container = $this.closest('.slider'),
          downWindow = $this.find('.thumbnail__list'),
          itemsDown = downBtn.find('.thumbnail__item'),
          itemsUp = upBtn.find('.thumbnail__item'),
          itemsSlide = slide.find('.slider__current-item'),
          activeItemDown = downBtn.find('.thumbnail__item--active'),
          activeItemUp = upBtn.find('.thumbnail__item--active'),
          activeItemSlide = slide.find('.slider__current-item--active');

      if (counterDown < 0) {
        counterDown = itemsDown.length-1;
      }

      if (counterUp < 0) {
        counterUp = itemsUp.length-1;
      }

      if (counterSlide < 0) {
        counterSlide = itemsUp.length-1;
      }

      var reqItemDown = itemsDown.eq(counterDown),
          reqItemUp = itemsUp.eq(counterUp),
          reqItemSlide = itemsSlide.eq(counterSlide);

      activeItemDown.animate({
        'top': '100%'
      }, 300);

      activeItemUp.animate({
        'top' : '-100%'
      }, 300);

      activeItemSlide.fadeOut(700);
      reqItemSlide.fadeIn(700);
      activeItemSlide.removeClass('slider__current-item--active').css('opacity', '0');
      reqItemSlide.addClass('slider__current-item--active');

      reqItemDown.animate({
        'top' : '0'
      }, 300, function() {
        activeItemDown.removeClass('thumbnail__item--active').css('top', '-100%');
        reqItemDown.addClass('thumbnail__item--active');
      });

      reqItemUp.animate({
        'top' : '0'
      }, 300, function() {
        activeItemUp.removeClass('thumbnail__item--active').css('top', '100%');
        reqItemUp.addClass('thumbnail__item--active');
      });
    });

    upBtn.on('click', function() { //Слайдер вниз ---------------------
      counterDown++;
      counterUp++;
      counterSlide++;
      var $this = $(this),
          container = $this.closest('.slider'),
          upWindow = $this.find('.thumbnail__list'),
          itemsDown = downBtn.find('.thumbnail__item'),
          itemsUp = upBtn.find('.thumbnail__item'),
          itemsSlide = slide.find('.slider__current-item'),
          activeItemDown = downBtn.find('.thumbnail__item--active'),
          activeItemUp = upBtn.find('.thumbnail__item--active'),
          activeItemSlide = slide.find('.slider__current-item--active');

      if (counterUp >= itemsUp.length) {
        counterUp = 0;
      }

      if (counterDown >= itemsDown.length) {
        counterDown = 0;
      }

      if (counterSlide >= itemsDown.length) {
        counterSlide = 0;
      }

      var reqItemDown = itemsDown.eq(counterDown),
          reqItemUp = itemsUp.eq(counterUp),
          reqItemSlide = itemsSlide.eq(counterSlide);

      activeItemDown.animate({
        'top': '100%'
      }, 300);

      activeItemUp.animate({
        'top' : '-100%'
      }, 300);

      activeItemSlide.fadeOut(700);
      reqItemSlide.fadeIn(700);
      activeItemSlide.removeClass('slider__current-item--active').css('opacity', '0');
      reqItemSlide.addClass('slider__current-item--active');

      reqItemDown.animate({
        'top' : '0'
      }, 300, function() {
        activeItemDown.removeClass('thumbnail__item--active').css('top', '-100%');
        reqItemDown.addClass('thumbnail__item--active');
      });
      reqItemUp.animate({
        'top' : '0'
      }, 300, function() {
        activeItemUp.removeClass('thumbnail__item--active').css('top', '100%');
        reqItemUp.addClass('thumbnail__item--active');
      });
    });


  //------------------------

  }());

}