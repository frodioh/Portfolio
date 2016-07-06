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
  });

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
    var downBtn = $('.thumbnail.thumbnail--down'),
        upBtn = $('.thumbnail.thumbnail--up'),
        slide = $('.slider__current'),
        description = $('.slider__description'),
        counterDown = 0,
        counterUp = 2,
        counterSlide = 1;
    downBtn.on('click', function() { //Вниз---------------
      //Счётчики
      counterDown--;
      counterUp--;
      counterSlide--;
      var $this = $(this),
          itemsDown = downBtn.find('.thumbnail__item'),
          itemsUp = upBtn.find('.thumbnail__item'),
          itemsSlide = slide.find('.slider__current-item'),
          itemsDescr = description.find('.slider__description-item'),
          activeItemDown = downBtn.find('.thumbnail__item--active'),
          activeItemUp = upBtn.find('.thumbnail__item--active'),
          activeItemSlide = slide.find('.slider__current-item--active'),
          activeItemDescr = description.find('.slider__description-item--active');

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
          reqItemSlide = itemsSlide.eq(counterSlide),
          reqItemDescr = itemsDescr.eq(counterSlide);

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

      reqItemDescr.addClass('slider__description-item--active').css({
        position: 'relative',
        opacity: '1'
      });

      activeItemDescr.removeClass('slider__description-item--active').css({
        position: 'absolute',
        opacity: '0'
      });

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
    upBtn.on('click', function() { //Вверх---------------------
      //Счётчики
      counterDown++;
      counterUp++;
      counterSlide++;
      var $this = $(this),
          itemsDown = downBtn.find('.thumbnail__item'),
          itemsUp = upBtn.find('.thumbnail__item'),
          itemsSlide = slide.find('.slider__current-item'),
          itemsDescr = description.find('.slider__description-item'),
          activeItemDown = downBtn.find('.thumbnail__item--active'),
          activeItemUp = upBtn.find('.thumbnail__item--active'),
          activeItemSlide = slide.find('.slider__current-item--active'),
          activeItemDescr = description.find('.slider__description-item--active');

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
          reqItemSlide = itemsSlide.eq(counterSlide),
          reqItemDescr = itemsDescr.eq(counterSlide);

      activeItemDown.animate({
        'top': '100%'
      }, 300);

      activeItemUp.animate({
        'top' : '-100%'
      }, 300);

      reqItemDescr.addClass('slider__description-item--active').css({
        position: 'relative',
        opacity: '1'
      });

      activeItemDescr.removeClass('slider__description-item--active').css({
        position: 'absolute',
        opacity: '0'
      });

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
  }());

  $(window).scroll(function() {
    var wScroll = $(window).scrollTop(),
        menu = $('.titles__wrapper'),
        sideBar = $('.titles--static'),
        stickyStart = sideBar.offset().top + 10,
        articles = $('.articles .article'),
        menuFixed = $('.titles--fixed'),
        menuStatic = $('.titles--static'),
        itemsFixed = $('.titles--fixed .titles__item'),
        itemsStatic = $('.titles--static .titles__item'),
        activeItemFixed = $('.titles--fixed .titles__item--active'),
        activeItemStatic = $('.titles--static .titles__item--active');

    if (wScroll >= stickyStart && !(menu.hasClass('titles__wrapper--fixed'))) {
      menu.toggleClass('titles__wrapper--fixed');
    }

    if (wScroll < stickyStart && menu.hasClass('titles__wrapper--fixed')) {
      menu.toggleClass('titles__wrapper--fixed');
    }

    (function() {
      var i,
          itemOffset = {
            value: 0,
            index: 0
          },
          offsetsMas = [];
      for (var i = 0; i < articles.length; i++) {
        offsetsMas.push($(articles[i]).offset().top-50);
      }
      for (var i = 0; i < articles.length; i++) {
        if (offsetsMas[i] > itemOffset.value && offsetsMas[i] <= wScroll) {
          itemOffset.value = offsetsMas[i];
          itemOffset.index = i;
        }
      }
      if (wScroll >= offsetsMas[offsetsMas.length-1]+$(articles[offsetsMas.length-1]).height()-800) {
        itemOffset.value = offsetsMas[offsetsMas.length-1];
        itemOffset.index = offsetsMas.length-1;
      }
      activeItemFixed.removeClass('titles__item--active');
      activeItemStatic.removeClass('titles__item--active');
      $(itemsFixed[itemOffset.index]).addClass('titles__item--active');
      $(itemsStatic[itemOffset.index]).addClass('titles__item--active');
    }());
  });

  (function(){
    var menuFixed = $('.titles--fixed'),
        menuBtn = menuFixed.find('.titles__btn'),
        clickArea = $('.titles-click-area');
    menuBtn.on('click', function(){
      clickArea.toggleClass('titles-click-area--active');
      menuFixed.toggleClass('titles--active');
    });
    clickArea.on('click', function(){
      clickArea.toggleClass('titles-click-area--active');
      menuFixed.toggleClass('titles--active');
    });
  }());

}