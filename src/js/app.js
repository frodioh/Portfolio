$(document).ready(function() {
  //Прелоадер
  $(function() {
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
  //Якорный переход
  $('.anchor-link').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body, html').animate({
      scrollTop: top
    }, 1500);
  });
});
window.onload = function() {
  var blog = !!document.getElementById("titlesWrapper");
  //Копирование меню и вставка его в выпадающее
  if (blog) $("#titlesWrapper .titles__list").clone().appendTo("#fixed");
  //Авторизация и фулскрин меню
  (function() {
    var card = document.getElementById("indexContainer"),
        authBtn = document.getElementById("authorizationBtn"),
        hamburger = document.getElementById("hamburger"),
        menu = document.getElementById("menu"),
        clickArea = document.getElementById("clickArea");
    //Переворот на главной
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
    //Фулскрин меню
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
  //Слайдер
  (function() {
    //Переменные слайдера
    var downBtn = $("#downBtn");
    var upBtn = $("#upBtn");
    var slide = $("#slide");
    var description = $("#slideDescr");
    var counterDown = 0;
    var counterUp = 2;
    var counterSlide = 1;
    //Все элементы
    var itemsDown = downBtn.find('.thumbnail__item'),
        itemsUp = upBtn.find('.thumbnail__item'),
        itemsSlide = slide.find('.slider__current-item'),
        itemsDescr = description.find('.slider__description-item');
    //Обработчик кнопки вниз
    downBtn.on('click', function() {
      //Декремент счётчиков
      counterDown--;
      counterUp--;
      counterSlide--;
      //Функция для смены слайда
      function toggleSlide() {
        //Скрытие активного слайда
        activeItemSlide.fadeOut(700);
        //Появление требуемого слайда
        reqItemSlide.fadeIn(700);
        //Удаление класса у бывшего активного слайда
        activeItemSlide.removeClass('slider__current-item--active').css('opacity', '0');
        //Добавление активного класса требуемому слайду
        reqItemSlide.addClass('slider__current-item--active');
        //Добавление требуемому описанию слайда активного класса
        reqItemDescr.addClass('slider__description-item--active');
        //Удаление класса у активного описания слайда
        activeItemDescr.removeClass('slider__description-item--active');
      }
      //Активные элементы
      var activeItemDown = downBtn.find('.thumbnail__item--active'),
          activeItemUp = upBtn.find('.thumbnail__item--active'),
          activeItemSlide = slide.find('.slider__current-item--active'),
          activeItemDescr = description.find('.slider__description-item--active');
      //Если счётчики меньше нуля обновить
      if (counterDown < 0) counterDown = itemsDown.length-1;
      if (counterUp < 0) counterUp = itemsUp.length-1;
      if (counterSlide < 0) counterSlide = itemsUp.length-1;
      //Требуемые элементы
      var reqItemDown = itemsDown.eq(counterDown),
          reqItemUp = itemsUp.eq(counterUp),
          reqItemSlide = itemsSlide.eq(counterSlide),
          reqItemDescr = itemsDescr.eq(counterSlide);
      //Скрытие активных миниатюр
      activeItemDown.animate({
        'top': '100%'
      }, 300);
      activeItemUp.animate({
        'top' : '-100%'
      }, 300);
      //Смена слайда
      toggleSlide();
      //Появление требуемых миниатюр
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
    //Обработчик кнопки вверх
    upBtn.on('click', function() {
      //Инкремент счётчиков
      counterDown++;
      counterUp++;
      counterSlide++;
      //Функция для смены слайда
      function toggleSlide() {
        //Скрытие активного слайда
        activeItemSlide.fadeOut(700);
        //Появление требуемого слайда
        reqItemSlide.fadeIn(700);
        //Удаление класса у бывшего активного слайда
        activeItemSlide.removeClass('slider__current-item--active').css('opacity', '0');
        //Добавление активного класса требуемому слайду
        reqItemSlide.addClass('slider__current-item--active');
        //Добавление требуемому описанию слайда активного класса
        reqItemDescr.addClass('slider__description-item--active');
        //Удаление класса у активного описания слайда
        activeItemDescr.removeClass('slider__description-item--active');
      }
      //Активные элементы
      var activeItemDown = downBtn.find('.thumbnail__item--active'),
          activeItemUp = upBtn.find('.thumbnail__item--active'),
          activeItemSlide = slide.find('.slider__current-item--active'),
          activeItemDescr = description.find('.slider__description-item--active');
      //Обнуление счётчиков, если уходят за пределы
      if (counterUp >= itemsUp.length) {
        counterUp = 0;
      }
      if (counterDown >= itemsDown.length) counterDown = 0;
      if (counterSlide >= itemsDown.length) counterSlide = 0;
      //Требуемые элементы
      var reqItemDown = itemsDown.eq(counterDown),
          reqItemUp = itemsUp.eq(counterUp),
          reqItemSlide = itemsSlide.eq(counterSlide),
          reqItemDescr = itemsDescr.eq(counterSlide);
      //Скрытие активных миниатюр
      activeItemDown.animate({
        'top': '100%'
      }, 300);
      activeItemUp.animate({
        'top' : '-100%'
      }, 300);
      //Смена слайда
      toggleSlide();
      //Появление требуемых миниатюр
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
  //Сайдбар в блоге
  $(window).scroll(function() {
    var scroll = $(window).scrollTop(),
        menu = $("#titlesWrapper"),
        sideBar = $("#static"),
        menuFixed = $("#fixed"),
        stickyStart,
        articles = $(".articles .article"),
        itemsFixed = menuFixed.find(".titles__item"),
        itemsStatic = sideBar.find(".titles__item"),
        activeItemFixed = menuFixed.find(".titles__item--active"),
        activeItemStatic = sideBar.find(".titles__item--active");
    if (blog) {
      //Вычисление положения начала прилипания
      stickyStart = sideBar.offset().top + 10;
      //Если прокрутка больше положения меню и меню еще не зафиксировано, то зафиксировать
      if (scroll >= stickyStart && !(menu.hasClass('titles__wrapper--fixed'))) menu.toggleClass('titles__wrapper--fixed');
      //Если прокрутка меньше положения меню и меню зафиксировано, то вернуть статик
      if (scroll < stickyStart && menu.hasClass('titles__wrapper--fixed')) menu.toggleClass('titles__wrapper--fixed');
      //Подсвечивание текущей статьи
      (function() {
        var itemOffset = {
              value: 0,
              index: 0
            },
            offsetsMas = [];
        //Создание массива с отступами всех элементов
        for (var i = 0; i < articles.length; i++) offsetsMas.push($(articles[i]).offset().top-50);
        //Объект содержит самый большой отступ из статей, отступ которых меньше текущего скролла
        for (var i = 0; i < articles.length; i++) {
          if (offsetsMas[i] > itemOffset.value && offsetsMas[i] <= scroll) {
            itemOffset.value = offsetsMas[i];
            itemOffset.index = i;
          }
        }
        //Дополнительное условие для последней статьи
        if (scroll+$(window).height() >= $(articles[offsetsMas.length-1]).offset().top+$(articles[offsetsMas.length-1]).height()) {
          itemOffset.value = offsetsMas[offsetsMas.length-1];
          itemOffset.index = offsetsMas.length-1;
        }
        //Удаление класса у активного элемента
        activeItemFixed.removeClass('titles__item--active');
        activeItemStatic.removeClass('titles__item--active');
        //Добавление активного класса нужному элементу
        $(itemsFixed[itemOffset.index]).addClass('titles__item--active');
        $(itemsStatic[itemOffset.index]).addClass('titles__item--active');
      }());
    }
  });
  //Выпадающий сайдбар в блоге
  (function(){
    var menuFixed = $("#fixed"),
        menuBtn = menuFixed.find('.titles__btn'),
        clickArea = $("#titlesClickArea");
    menuBtn.on('click', function(){
      clickArea.toggleClass('titles-click-area--active');
      menuFixed.toggleClass('titles--active');
    });
    clickArea.on('click', function(){
      clickArea.toggleClass('titles-click-area--active');
      menuFixed.toggleClass('titles--active');
    });
  }());
};