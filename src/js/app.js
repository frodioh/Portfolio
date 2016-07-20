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
  //Авторизация
  if(document.querySelector("#loginForm")) {
    var btn = document.querySelector("#loginFormBtn");
    var authBtn = document.getElementById("authModalBtn");
    var authModal = document.getElementById("authModal");
    var authArea = document.getElementById("authArea");
    var parentElem = authModal;
    var childElem = document.createElement("span");
    authBtn.addEventListener("click", function(e) {
      e.preventDefault();
      authModal.classList.remove("active");
      authArea.classList.remove("active");
      parentElem.removeChild(childElem);
    });
    btn.addEventListener("click", function(e) {
      var login = document.querySelector("#formLogin").value;
      var pass = document.querySelector("#formPass").value;
      var check = document.querySelector("#captcha").checked;
      var radio = document.querySelector("#captcha-radio-yes").checked;
      console.log(document.querySelector("#captcha").checked, document.querySelector("#captcha-radio-yes").checked);
      if(radio && check) {
        var data = {
          "login": login,
          "pass": pass,
          "check": check,
          "radio": radio
        };
        $.ajax({
          url: '/auth',
          type: 'POST',
          data: JSON.stringify(data),
          cache: false,
          processData: false,
          contentType: 'application/json; charset=utf8',
          dataType: 'json',
          success: function(data, status) {
            if(data.isValid) {
              location = "/admin.html";
            } else {
              authModal.classList.add("active");
              authArea.classList.add("active");
              parentElem.appendChild(childElem);
              childElem.innerHTML = "Неверный логин или пароль!";
            }
          }
        });
      } else {
        authModal.classList.add("active");
        authArea.classList.add("active");
        parentElem.appendChild(childElem);
        childElem.innerHTML = "Прочь, железяка!";
      }
    });
  }

  //Slider init and post
  if (document.getElementById("slider")) {
    var current = document.querySelectorAll(".slider__current-item");
    var descr = document.querySelectorAll(".slider__description-item");
    var downBtn = document.querySelectorAll("#downBtn .thumbnail__item");
    var upBtn = document.querySelectorAll("#upBtn .thumbnail__item");

    current[1].classList.add("slider__current-item--active");
    descr[1].classList.add("slider__description-item--active");
    $(descr[1]).css('z-index', '5');
    downBtn[0].classList.add("thumbnail__item--active");
    upBtn[2].classList.add("thumbnail__item--active");

    //Почта
    function clearMail() {
      document.getElementById("letterName").value = "";
      document.getElementById("letterEmail").value = "";
      document.getElementById("letterText").value = "";
    };
    var mailBtn = document.getElementById("letterBtn");
    var clearBtn = document.getElementById("clearBtn");
    mailBtn.addEventListener("click", function() {
      var patternEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
      var mail = {
          "name": document.getElementById("letterName").value,
          "email": document.getElementById("letterEmail").value,
          "text": document.getElementById("letterText").value
        };
      if (patternEmail.test(mail.email)) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/mail');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(mail));
        clearMail();
      } else {
        console.log("неправильно ввёл email!");
      }
    });
    clearBtn.addEventListener("click", function() {
      clearMail();
    });
    
  }
  //Заполнение скилов
  if (document.getElementById("forest-map")) {
    (function() {
      var techs = [
            'html',
            'css',
            'js',
            'php',
            'nodejs',
            'mongodb',
            'git',
            'gulp',
            'bower'
          ];
      techs.forEach(function(item){
        var name = ".graph__fill--"+item;
        var graph = document.querySelector(name);
        var fill = graph.getAttribute("data-fill");
        fill = 282.5 - (fill * 2.825);
        graph.style.cssText = "--offset: "+fill;
      });
    }());
  }

  var blog = !!document.getElementById("titlesWrapper");
  //Копирование меню и вставка его в выпадающее
  if (blog) {
    $("#titlesWrapper .titles__list").clone().appendTo("#fixed");
    $("<a>").addClass("titles__btn").appendTo("#fixed");
    $("#fixed .titles__item:nth-child(1)").addClass("titles__item--active");
    $("#static .titles__item:nth-child(1)").addClass("titles__item--active");
  }
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
        reqItemDescr.addClass('slider__description-item--active').css('z-index', '5');
        //Удаление класса у активного описания слайда
        activeItemDescr.removeClass('slider__description-item--active').css('z-index', '0');
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
        reqItemDescr.addClass('slider__description-item--active').css('z-index', '5');
        //Удаление класса у активного описания слайда
        activeItemDescr.removeClass('slider__description-item--active').css('z-index', '0');
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
  if (blog) {
    var itemsFixed = $("#fixed .titles__item"),
        itemsStatic = $("#static .titles__item"),
        articles = $(".articles .article");
    //Обработчик всех ссылок
    itemsStatic.on("click", function() {
      var index = $(this).index(),
          top = articles.eq(index).offset().top;
      if (articles.length-1 === index) {
        $('body, html').animate({
          scrollTop: articles.eq(index).offset().top + articles.eq(index).height() - $(window).height()
        }, 1000);
      } else {
        $('body, html').animate({
          scrollTop: top
        }, 1000);
      }
    });
    itemsFixed.on("click", function() {
      var index = $(this).index(),
          top = articles.eq(index).offset().top;
      if (articles.length-1 === index) {
        $('body, html').animate({
          scrollTop: articles.eq(index).offset().top + articles.eq(index).height() - $(window).height()
        }, 1000);
      } else {
        $('body, html').animate({
          scrollTop: top
        }, 1000);
      }
    });
  }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIC8v0J/RgNC10LvQvtCw0LTQtdGAXHJcbiAgJChmdW5jdGlvbigpIHtcclxuICAgIHZhciBpbWdzID0gW10sXHJcbiAgICAgICAgcGVyY2VudHMgPSAxO1xyXG5cclxuICAgICQoJyonKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpLFxyXG4gICAgICAgICAgYmFja2dyb3VuZCA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG5cclxuICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybCgnLCcnKS5yZXBsYWNlKCcpJywnJyk7XHJcbiAgICAgICAgaWYgKHBhdGhbMF0gPT09ICdcIicgfHwgcGF0aFswXSA9PT0gJ1xcJycpIHtcclxuICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhdGhbcGF0aC5sZW5ndGgtMV0gPT09ICdcIicgfHwgcGF0aFswXSA9PT0gJ1xcJycpIHtcclxuICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLHBhdGgubGVuZ3RoLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGltZykge1xyXG4gICAgICAgIHZhciBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XHJcbiAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgIHNyYzogaW1nc1tpXVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGltYWdlLmxvYWQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzKTtcclxuICAgICAgICBwZXJjZW50cysrO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICB2YXIgcGVyY2VudCA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG4gICAgICAkKCcucHJlbG9hZGVyX190ZXh0JykudGV4dChwZXJjZW50ICsgJyUnKTtcclxuICAgICAgaWYgKHBlcmNlbnQgPj0gMTAwKSB7XHJcbiAgICAgICAgJCgnLndyYXBwZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKCcuaW5uZXItd3JhcHBlcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQoJy5wcmVsb2FkZXInKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkKCcuZmxpcHBlcicpLnJlbW92ZUNsYXNzKCdmbGlwcGVyLS11bmxvYWQnKTtcclxuICAgICAgICB9LCA0MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG4gIC8v0K/QutC+0YDQvdGL0Lkg0L/QtdGA0LXRhdC+0LRcclxuICAkKCcuYW5jaG9yLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICB0b3AgPSAkKGlkKS5vZmZzZXQoKS50b3A7XHJcbiAgICAkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgIHNjcm9sbFRvcDogdG9wXHJcbiAgICB9LCAxNTAwKTtcclxuICB9KTtcclxufSk7XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgYmxvZyA9ICEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZXNXcmFwcGVyXCIpO1xyXG4gIC8v0JrQvtC/0LjRgNC+0LLQsNC90LjQtSDQvNC10L3RjiDQuCDQstGB0YLQsNCy0LrQsCDQtdCz0L4g0LIg0LLRi9C/0LDQtNCw0Y7RidC10LVcclxuICBpZiAoYmxvZykgJChcIiN0aXRsZXNXcmFwcGVyIC50aXRsZXNfX2xpc3RcIikuY2xvbmUoKS5hcHBlbmRUbyhcIiNmaXhlZFwiKTtcclxuICAvL9CQ0LLRgtC+0YDQuNC30LDRhtC40Y8g0Lgg0YTRg9C70YHQutGA0LjQvSDQvNC10L3RjlxyXG4gIChmdW5jdGlvbigpIHtcclxuICAgIHZhciBjYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRleENvbnRhaW5lclwiKSxcclxuICAgICAgICBhdXRoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdXRob3JpemF0aW9uQnRuXCIpLFxyXG4gICAgICAgIGhhbWJ1cmdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGFtYnVyZ2VyXCIpLFxyXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnVcIiksXHJcbiAgICAgICAgY2xpY2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGlja0FyZWFcIik7XHJcbiAgICAvL9Cf0LXRgNC10LLQvtGA0L7RgiDQvdCwINCz0LvQsNCy0L3QvtC5XHJcbiAgICBpZiAoYXV0aEJ0bikge1xyXG4gICAgICBjbGlja0FyZWEub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LnRvZ2dsZShcImluZGV4LWNvbnRhaW5lci0tZmxpcFwiKTtcclxuICAgICAgICBhdXRoQnRuLmNsYXNzTGlzdC50b2dnbGUoXCJhdXRob3JpemF0aW9uLWJ0bi0tY2xpY2tlZFwiKTtcclxuICAgICAgICBjbGlja0FyZWEuY2xhc3NMaXN0LnRvZ2dsZShcImNsaWNrLWFyZWEtLWRpc3BsYXlcIik7XHJcbiAgICAgIH07XHJcbiAgICAgIGF1dGhCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LnRvZ2dsZShcImluZGV4LWNvbnRhaW5lci0tZmxpcFwiKTtcclxuICAgICAgICBhdXRoQnRuLmNsYXNzTGlzdC50b2dnbGUoXCJhdXRob3JpemF0aW9uLWJ0bi0tY2xpY2tlZFwiKTtcclxuICAgICAgICBjbGlja0FyZWEuY2xhc3NMaXN0LnRvZ2dsZShcImNsaWNrLWFyZWEtLWRpc3BsYXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8v0KTRg9C70YHQutGA0LjQvSDQvNC10L3RjlxyXG4gICAgaWYgKGhhbWJ1cmdlcikge1xyXG4gICAgICBoYW1idXJnZXIub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgbGlzdDtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1lbnVfX2xpc3RcIilbMF0pIHtcclxuICAgICAgICAgIGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibWVudV9fbGlzdFwiKVswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShcIm1lbnUtLWFjdGl2ZVwiKTtcclxuICAgICAgICBpZiAoaGFtYnVyZ2VyLmNsYXNzTGlzdC5jb250YWlucygnaGFtYnVyZ2VyLS10cmFuc2Zvcm1lZCcpKSB7XHJcbiAgICAgICAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ21lbnVfX2xpc3QtLWFjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ21lbnVfX2xpc3QtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoXCJoYW1idXJnZXItLXRyYW5zZm9ybWVkXCIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KCkpO1xyXG4gIC8v0KHQu9Cw0LnQtNC10YBcclxuICAoZnVuY3Rpb24oKSB7XHJcbiAgICAvL9Cf0LXRgNC10LzQtdC90L3Ri9C1INGB0LvQsNC50LTQtdGA0LBcclxuICAgIHZhciBkb3duQnRuID0gJChcIiNkb3duQnRuXCIpO1xyXG4gICAgdmFyIHVwQnRuID0gJChcIiN1cEJ0blwiKTtcclxuICAgIHZhciBzbGlkZSA9ICQoXCIjc2xpZGVcIik7XHJcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAkKFwiI3NsaWRlRGVzY3JcIik7XHJcbiAgICB2YXIgY291bnRlckRvd24gPSAwO1xyXG4gICAgdmFyIGNvdW50ZXJVcCA9IDI7XHJcbiAgICB2YXIgY291bnRlclNsaWRlID0gMTtcclxuICAgIC8v0JLRgdC1INGN0LvQtdC80LXQvdGC0YtcclxuICAgIHZhciBpdGVtc0Rvd24gPSBkb3duQnRuLmZpbmQoJy50aHVtYm5haWxfX2l0ZW0nKSxcclxuICAgICAgICBpdGVtc1VwID0gdXBCdG4uZmluZCgnLnRodW1ibmFpbF9faXRlbScpLFxyXG4gICAgICAgIGl0ZW1zU2xpZGUgPSBzbGlkZS5maW5kKCcuc2xpZGVyX19jdXJyZW50LWl0ZW0nKSxcclxuICAgICAgICBpdGVtc0Rlc2NyID0gZGVzY3JpcHRpb24uZmluZCgnLnNsaWRlcl9fZGVzY3JpcHRpb24taXRlbScpO1xyXG4gICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQutC90L7Qv9C60Lgg0LLQvdC40LdcclxuICAgIGRvd25CdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8v0JTQtdC60YDQtdC80LXQvdGCINGB0YfRkdGC0YfQuNC60L7QslxyXG4gICAgICBjb3VudGVyRG93bi0tO1xyXG4gICAgICBjb3VudGVyVXAtLTtcclxuICAgICAgY291bnRlclNsaWRlLS07XHJcbiAgICAgIC8v0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LzQtdC90Ysg0YHQu9Cw0LnQtNCwXHJcbiAgICAgIGZ1bmN0aW9uIHRvZ2dsZVNsaWRlKCkge1xyXG4gICAgICAgIC8v0KHQutGA0YvRgtC40LUg0LDQutGC0LjQstC90L7Qs9C+INGB0LvQsNC50LTQsFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1TbGlkZS5mYWRlT3V0KDcwMCk7XHJcbiAgICAgICAgLy/Qn9C+0Y/QstC70LXQvdC40LUg0YLRgNC10LHRg9C10LzQvtCz0L4g0YHQu9Cw0LnQtNCwXHJcbiAgICAgICAgcmVxSXRlbVNsaWRlLmZhZGVJbig3MDApO1xyXG4gICAgICAgIC8v0KPQtNCw0LvQtdC90LjQtSDQutC70LDRgdGB0LAg0YMg0LHRi9Cy0YjQtdCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGB0LvQsNC50LTQsFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1TbGlkZS5yZW1vdmVDbGFzcygnc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpLmNzcygnb3BhY2l0eScsICcwJyk7XHJcbiAgICAgICAgLy/QlNC+0LHQsNCy0LvQtdC90LjQtSDQsNC60YLQuNCy0L3QvtCz0L4g0LrQu9Cw0YHRgdCwINGC0YDQtdCx0YPQtdC80L7QvNGDINGB0LvQsNC50LTRg1xyXG4gICAgICAgIHJlcUl0ZW1TbGlkZS5hZGRDbGFzcygnc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICAgIC8v0JTQvtCx0LDQstC70LXQvdC40LUg0YLRgNC10LHRg9C10LzQvtC80YMg0L7Qv9C40YHQsNC90LjRjiDRgdC70LDQudC00LAg0LDQutGC0LjQstC90L7Qs9C+INC60LvQsNGB0YHQsFxyXG4gICAgICAgIHJlcUl0ZW1EZXNjci5hZGRDbGFzcygnc2xpZGVyX19kZXNjcmlwdGlvbi1pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICAvL9Cj0LTQsNC70LXQvdC40LUg0LrQu9Cw0YHRgdCwINGDINCw0LrRgtC40LLQvdC+0LPQviDQvtC/0LjRgdCw0L3QuNGPINGB0LvQsNC50LTQsFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1EZXNjci5yZW1vdmVDbGFzcygnc2xpZGVyX19kZXNjcmlwdGlvbi1pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgICAvL9CQ0LrRgtC40LLQvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xyXG4gICAgICB2YXIgYWN0aXZlSXRlbURvd24gPSBkb3duQnRuLmZpbmQoJy50aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpLFxyXG4gICAgICAgICAgYWN0aXZlSXRlbVVwID0gdXBCdG4uZmluZCgnLnRodW1ibmFpbF9faXRlbS0tYWN0aXZlJyksXHJcbiAgICAgICAgICBhY3RpdmVJdGVtU2xpZGUgPSBzbGlkZS5maW5kKCcuc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpLFxyXG4gICAgICAgICAgYWN0aXZlSXRlbURlc2NyID0gZGVzY3JpcHRpb24uZmluZCgnLnNsaWRlcl9fZGVzY3JpcHRpb24taXRlbS0tYWN0aXZlJyk7XHJcbiAgICAgIC8v0JXRgdC70Lgg0YHRh9GR0YLRh9C40LrQuCDQvNC10L3RjNGI0LUg0L3Rg9C70Y8g0L7QsdC90L7QstC40YLRjFxyXG4gICAgICBpZiAoY291bnRlckRvd24gPCAwKSBjb3VudGVyRG93biA9IGl0ZW1zRG93bi5sZW5ndGgtMTtcclxuICAgICAgaWYgKGNvdW50ZXJVcCA8IDApIGNvdW50ZXJVcCA9IGl0ZW1zVXAubGVuZ3RoLTE7XHJcbiAgICAgIGlmIChjb3VudGVyU2xpZGUgPCAwKSBjb3VudGVyU2xpZGUgPSBpdGVtc1VwLmxlbmd0aC0xO1xyXG4gICAgICAvL9Ci0YDQtdCx0YPQtdC80YvQtSDRjdC70LXQvNC10L3RgtGLXHJcbiAgICAgIHZhciByZXFJdGVtRG93biA9IGl0ZW1zRG93bi5lcShjb3VudGVyRG93biksXHJcbiAgICAgICAgICByZXFJdGVtVXAgPSBpdGVtc1VwLmVxKGNvdW50ZXJVcCksXHJcbiAgICAgICAgICByZXFJdGVtU2xpZGUgPSBpdGVtc1NsaWRlLmVxKGNvdW50ZXJTbGlkZSksXHJcbiAgICAgICAgICByZXFJdGVtRGVzY3IgPSBpdGVtc0Rlc2NyLmVxKGNvdW50ZXJTbGlkZSk7XHJcbiAgICAgIC8v0KHQutGA0YvRgtC40LUg0LDQutGC0LjQstC90YvRhSDQvNC40L3QuNCw0YLRjtGAXHJcbiAgICAgIGFjdGl2ZUl0ZW1Eb3duLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnOiAnMTAwJSdcclxuICAgICAgfSwgMzAwKTtcclxuICAgICAgYWN0aXZlSXRlbVVwLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnIDogJy0xMDAlJ1xyXG4gICAgICB9LCAzMDApO1xyXG4gICAgICAvL9Ch0LzQtdC90LAg0YHQu9Cw0LnQtNCwXHJcbiAgICAgIHRvZ2dsZVNsaWRlKCk7XHJcbiAgICAgIC8v0J/QvtGP0LLQu9C10L3QuNC1INGC0YDQtdCx0YPQtdC80YvRhSDQvNC40L3QuNCw0YLRjtGAXHJcbiAgICAgIHJlcUl0ZW1Eb3duLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnIDogJzAnXHJcbiAgICAgIH0sIDMwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYWN0aXZlSXRlbURvd24ucmVtb3ZlQ2xhc3MoJ3RodW1ibmFpbF9faXRlbS0tYWN0aXZlJykuY3NzKCd0b3AnLCAnLTEwMCUnKTtcclxuICAgICAgICByZXFJdGVtRG93bi5hZGRDbGFzcygndGh1bWJuYWlsX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJlcUl0ZW1VcC5hbmltYXRlKHtcclxuICAgICAgICAndG9wJyA6ICcwJ1xyXG4gICAgICB9LCAzMDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFjdGl2ZUl0ZW1VcC5yZW1vdmVDbGFzcygndGh1bWJuYWlsX19pdGVtLS1hY3RpdmUnKS5jc3MoJ3RvcCcsICcxMDAlJyk7XHJcbiAgICAgICAgcmVxSXRlbVVwLmFkZENsYXNzKCd0aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQutC90L7Qv9C60Lgg0LLQstC10YDRhVxyXG4gICAgdXBCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8v0JjQvdC60YDQtdC80LXQvdGCINGB0YfRkdGC0YfQuNC60L7QslxyXG4gICAgICBjb3VudGVyRG93bisrO1xyXG4gICAgICBjb3VudGVyVXArKztcclxuICAgICAgY291bnRlclNsaWRlKys7XHJcbiAgICAgIC8v0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LzQtdC90Ysg0YHQu9Cw0LnQtNCwXHJcbiAgICAgIGZ1bmN0aW9uIHRvZ2dsZVNsaWRlKCkge1xyXG4gICAgICAgIC8v0KHQutGA0YvRgtC40LUg0LDQutGC0LjQstC90L7Qs9C+INGB0LvQsNC50LTQsFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1TbGlkZS5mYWRlT3V0KDcwMCk7XHJcbiAgICAgICAgLy/Qn9C+0Y/QstC70LXQvdC40LUg0YLRgNC10LHRg9C10LzQvtCz0L4g0YHQu9Cw0LnQtNCwXHJcbiAgICAgICAgcmVxSXRlbVNsaWRlLmZhZGVJbig3MDApO1xyXG4gICAgICAgIC8v0KPQtNCw0LvQtdC90LjQtSDQutC70LDRgdGB0LAg0YMg0LHRi9Cy0YjQtdCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGB0LvQsNC50LTQsFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1TbGlkZS5yZW1vdmVDbGFzcygnc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpLmNzcygnb3BhY2l0eScsICcwJyk7XHJcbiAgICAgICAgLy/QlNC+0LHQsNCy0LvQtdC90LjQtSDQsNC60YLQuNCy0L3QvtCz0L4g0LrQu9Cw0YHRgdCwINGC0YDQtdCx0YPQtdC80L7QvNGDINGB0LvQsNC50LTRg1xyXG4gICAgICAgIHJlcUl0ZW1TbGlkZS5hZGRDbGFzcygnc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICAgIC8v0JTQvtCx0LDQstC70LXQvdC40LUg0YLRgNC10LHRg9C10LzQvtC80YMg0L7Qv9C40YHQsNC90LjRjiDRgdC70LDQudC00LAg0LDQutGC0LjQstC90L7Qs9C+INC60LvQsNGB0YHQsFxyXG4gICAgICAgIHJlcUl0ZW1EZXNjci5hZGRDbGFzcygnc2xpZGVyX19kZXNjcmlwdGlvbi1pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICAvL9Cj0LTQsNC70LXQvdC40LUg0LrQu9Cw0YHRgdCwINGDINCw0LrRgtC40LLQvdC+0LPQviDQvtC/0LjRgdCw0L3QuNGPINGB0LvQsNC50LTQsFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1EZXNjci5yZW1vdmVDbGFzcygnc2xpZGVyX19kZXNjcmlwdGlvbi1pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgICAvL9CQ0LrRgtC40LLQvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xyXG4gICAgICB2YXIgYWN0aXZlSXRlbURvd24gPSBkb3duQnRuLmZpbmQoJy50aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpLFxyXG4gICAgICAgICAgYWN0aXZlSXRlbVVwID0gdXBCdG4uZmluZCgnLnRodW1ibmFpbF9faXRlbS0tYWN0aXZlJyksXHJcbiAgICAgICAgICBhY3RpdmVJdGVtU2xpZGUgPSBzbGlkZS5maW5kKCcuc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpLFxyXG4gICAgICAgICAgYWN0aXZlSXRlbURlc2NyID0gZGVzY3JpcHRpb24uZmluZCgnLnNsaWRlcl9fZGVzY3JpcHRpb24taXRlbS0tYWN0aXZlJyk7XHJcbiAgICAgIC8v0J7QsdC90YPQu9C10L3QuNC1INGB0YfRkdGC0YfQuNC60L7Qsiwg0LXRgdC70Lgg0YPRhdC+0LTRj9GCINC30LAg0L/RgNC10LTQtdC70YtcclxuICAgICAgaWYgKGNvdW50ZXJVcCA+PSBpdGVtc1VwLmxlbmd0aCkge1xyXG4gICAgICAgIGNvdW50ZXJVcCA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvdW50ZXJEb3duID49IGl0ZW1zRG93bi5sZW5ndGgpIGNvdW50ZXJEb3duID0gMDtcclxuICAgICAgaWYgKGNvdW50ZXJTbGlkZSA+PSBpdGVtc0Rvd24ubGVuZ3RoKSBjb3VudGVyU2xpZGUgPSAwO1xyXG4gICAgICAvL9Ci0YDQtdCx0YPQtdC80YvQtSDRjdC70LXQvNC10L3RgtGLXHJcbiAgICAgIHZhciByZXFJdGVtRG93biA9IGl0ZW1zRG93bi5lcShjb3VudGVyRG93biksXHJcbiAgICAgICAgICByZXFJdGVtVXAgPSBpdGVtc1VwLmVxKGNvdW50ZXJVcCksXHJcbiAgICAgICAgICByZXFJdGVtU2xpZGUgPSBpdGVtc1NsaWRlLmVxKGNvdW50ZXJTbGlkZSksXHJcbiAgICAgICAgICByZXFJdGVtRGVzY3IgPSBpdGVtc0Rlc2NyLmVxKGNvdW50ZXJTbGlkZSk7XHJcbiAgICAgIC8v0KHQutGA0YvRgtC40LUg0LDQutGC0LjQstC90YvRhSDQvNC40L3QuNCw0YLRjtGAXHJcbiAgICAgIGFjdGl2ZUl0ZW1Eb3duLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnOiAnMTAwJSdcclxuICAgICAgfSwgMzAwKTtcclxuICAgICAgYWN0aXZlSXRlbVVwLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnIDogJy0xMDAlJ1xyXG4gICAgICB9LCAzMDApO1xyXG4gICAgICAvL9Ch0LzQtdC90LAg0YHQu9Cw0LnQtNCwXHJcbiAgICAgIHRvZ2dsZVNsaWRlKCk7XHJcbiAgICAgIC8v0J/QvtGP0LLQu9C10L3QuNC1INGC0YDQtdCx0YPQtdC80YvRhSDQvNC40L3QuNCw0YLRjtGAXHJcbiAgICAgIHJlcUl0ZW1Eb3duLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnIDogJzAnXHJcbiAgICAgIH0sIDMwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYWN0aXZlSXRlbURvd24ucmVtb3ZlQ2xhc3MoJ3RodW1ibmFpbF9faXRlbS0tYWN0aXZlJykuY3NzKCd0b3AnLCAnLTEwMCUnKTtcclxuICAgICAgICByZXFJdGVtRG93bi5hZGRDbGFzcygndGh1bWJuYWlsX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJlcUl0ZW1VcC5hbmltYXRlKHtcclxuICAgICAgICAndG9wJyA6ICcwJ1xyXG4gICAgICB9LCAzMDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFjdGl2ZUl0ZW1VcC5yZW1vdmVDbGFzcygndGh1bWJuYWlsX19pdGVtLS1hY3RpdmUnKS5jc3MoJ3RvcCcsICcxMDAlJyk7XHJcbiAgICAgICAgcmVxSXRlbVVwLmFkZENsYXNzKCd0aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0oKSk7XHJcbiAgLy/QodCw0LnQtNCx0LDRgCDQsiDQsdC70L7Qs9C1XHJcbiAgaWYgKGJsb2cpIHtcclxuICAgIHZhciBpdGVtc0ZpeGVkID0gJChcIiNmaXhlZCAudGl0bGVzX19pdGVtXCIpLFxyXG4gICAgICAgIGl0ZW1zU3RhdGljID0gJChcIiNzdGF0aWMgLnRpdGxlc19faXRlbVwiKSxcclxuICAgICAgICBhcnRpY2xlcyA9ICQoXCIuYXJ0aWNsZXMgLmFydGljbGVcIik7XHJcbiAgICAvL9Ce0LHRgNCw0LHQvtGC0YfQuNC6INCy0YHQtdGFINGB0YHRi9C70L7QulxyXG4gICAgaXRlbXNTdGF0aWMub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG4gICAgICAgICAgdG9wID0gYXJ0aWNsZXMuZXEoaW5kZXgpLm9mZnNldCgpLnRvcDtcclxuICAgICAgaWYgKGFydGljbGVzLmxlbmd0aC0xID09PSBpbmRleCkge1xyXG4gICAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogYXJ0aWNsZXMuZXEoaW5kZXgpLm9mZnNldCgpLnRvcCArIGFydGljbGVzLmVxKGluZGV4KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogdG9wXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaXRlbXNGaXhlZC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcbiAgICAgICAgICB0b3AgPSBhcnRpY2xlcy5lcShpbmRleCkub2Zmc2V0KCkudG9wO1xyXG4gICAgICBpZiAoYXJ0aWNsZXMubGVuZ3RoLTEgPT09IGluZGV4KSB7XHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2Nyb2xsVG9wOiBhcnRpY2xlcy5lcShpbmRleCkub2Zmc2V0KCkudG9wICsgYXJ0aWNsZXMuZXEoaW5kZXgpLmhlaWdodCgpIC0gJCh3aW5kb3cpLmhlaWdodCgpXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2Nyb2xsVG9wOiB0b3BcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgIG1lbnUgPSAkKFwiI3RpdGxlc1dyYXBwZXJcIiksXHJcbiAgICAgICAgc2lkZUJhciA9ICQoXCIjc3RhdGljXCIpLFxyXG4gICAgICAgIG1lbnVGaXhlZCA9ICQoXCIjZml4ZWRcIiksXHJcbiAgICAgICAgc3RpY2t5U3RhcnQsXHJcbiAgICAgICAgYXJ0aWNsZXMgPSAkKFwiLmFydGljbGVzIC5hcnRpY2xlXCIpLFxyXG4gICAgICAgIGl0ZW1zRml4ZWQgPSBtZW51Rml4ZWQuZmluZChcIi50aXRsZXNfX2l0ZW1cIiksXHJcbiAgICAgICAgaXRlbXNTdGF0aWMgPSBzaWRlQmFyLmZpbmQoXCIudGl0bGVzX19pdGVtXCIpLFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1GaXhlZCA9IG1lbnVGaXhlZC5maW5kKFwiLnRpdGxlc19faXRlbS0tYWN0aXZlXCIpLFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1TdGF0aWMgPSBzaWRlQmFyLmZpbmQoXCIudGl0bGVzX19pdGVtLS1hY3RpdmVcIik7XHJcbiAgICBpZiAoYmxvZykge1xyXG4gICAgICAvL9CS0YvRh9C40YHQu9C10L3QuNC1INC/0L7Qu9C+0LbQtdC90LjRjyDQvdCw0YfQsNC70LAg0L/RgNC40LvQuNC/0LDQvdC40Y9cclxuICAgICAgc3RpY2t5U3RhcnQgPSBzaWRlQmFyLm9mZnNldCgpLnRvcCArIDEwO1xyXG4gICAgICAvL9CV0YHQu9C4INC/0YDQvtC60YDRg9GC0LrQsCDQsdC+0LvRjNGI0LUg0L/QvtC70L7QttC10L3QuNGPINC80LXQvdGOINC4INC80LXQvdGOINC10YnQtSDQvdC1INC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC+LCDRgtC+INC30LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXHJcbiAgICAgIGlmIChzY3JvbGwgPj0gc3RpY2t5U3RhcnQgJiYgIShtZW51Lmhhc0NsYXNzKCd0aXRsZXNfX3dyYXBwZXItLWZpeGVkJykpKSBtZW51LnRvZ2dsZUNsYXNzKCd0aXRsZXNfX3dyYXBwZXItLWZpeGVkJyk7XHJcbiAgICAgIC8v0JXRgdC70Lgg0L/RgNC+0LrRgNGD0YLQutCwINC80LXQvdGM0YjQtSDQv9C+0LvQvtC20LXQvdC40Y8g0LzQtdC90Y4g0Lgg0LzQtdC90Y4g0LfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L4sINGC0L4g0LLQtdGA0L3Rg9GC0Ywg0YHRgtCw0YLQuNC6XHJcbiAgICAgIGlmIChzY3JvbGwgPCBzdGlja3lTdGFydCAmJiBtZW51Lmhhc0NsYXNzKCd0aXRsZXNfX3dyYXBwZXItLWZpeGVkJykpIG1lbnUudG9nZ2xlQ2xhc3MoJ3RpdGxlc19fd3JhcHBlci0tZml4ZWQnKTtcclxuICAgICAgLy/Qn9C+0LTRgdCy0LXRh9C40LLQsNC90LjQtSDRgtC10LrRg9GJ0LXQuSDRgdGC0LDRgtGM0LhcclxuICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpdGVtT2Zmc2V0ID0ge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9mZnNldHNNYXMgPSBbXTtcclxuICAgICAgICAvL9Ch0L7Qt9C00LDQvdC40LUg0LzQsNGB0YHQuNCy0LAg0YEg0L7RgtGB0YLRg9C/0LDQvNC4INCy0YHQtdGFINGN0LvQtdC80LXQvdGC0L7QslxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ0aWNsZXMubGVuZ3RoOyBpKyspIG9mZnNldHNNYXMucHVzaCgkKGFydGljbGVzW2ldKS5vZmZzZXQoKS50b3AtNTApO1xyXG4gICAgICAgIC8v0J7QsdGK0LXQutGCINGB0L7QtNC10YDQttC40YIg0YHQsNC80YvQuSDQsdC+0LvRjNGI0L7QuSDQvtGC0YHRgtGD0L8g0LjQtyDRgdGC0LDRgtC10LksINC+0YLRgdGC0YPQvyDQutC+0YLQvtGA0YvRhSDQvNC10L3RjNGI0LUg0YLQtdC60YPRidC10LPQviDRgdC60YDQvtC70LvQsFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChvZmZzZXRzTWFzW2ldID4gaXRlbU9mZnNldC52YWx1ZSAmJiBvZmZzZXRzTWFzW2ldIDw9IHNjcm9sbCkge1xyXG4gICAgICAgICAgICBpdGVtT2Zmc2V0LnZhbHVlID0gb2Zmc2V0c01hc1tpXTtcclxuICAgICAgICAgICAgaXRlbU9mZnNldC5pbmRleCA9IGk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90L7QtSDRg9GB0LvQvtCy0LjQtSDQtNC70Y8g0L/QvtGB0LvQtdC00L3QtdC5INGB0YLQsNGC0YzQuFxyXG4gICAgICAgIGlmIChzY3JvbGwrJCh3aW5kb3cpLmhlaWdodCgpID49ICQoYXJ0aWNsZXNbb2Zmc2V0c01hcy5sZW5ndGgtMV0pLm9mZnNldCgpLnRvcCskKGFydGljbGVzW29mZnNldHNNYXMubGVuZ3RoLTFdKS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgaXRlbU9mZnNldC52YWx1ZSA9IG9mZnNldHNNYXNbb2Zmc2V0c01hcy5sZW5ndGgtMV07XHJcbiAgICAgICAgICBpdGVtT2Zmc2V0LmluZGV4ID0gb2Zmc2V0c01hcy5sZW5ndGgtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/Qo9C00LDQu9C10L3QuNC1INC60LvQsNGB0YHQsCDRgyDQsNC60YLQuNCy0L3QvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1GaXhlZC5yZW1vdmVDbGFzcygndGl0bGVzX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICBhY3RpdmVJdGVtU3RhdGljLnJlbW92ZUNsYXNzKCd0aXRsZXNfX2l0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICAgIC8v0JTQvtCx0LDQstC70LXQvdC40LUg0LDQutGC0LjQstC90L7Qs9C+INC60LvQsNGB0YHQsCDQvdGD0LbQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDXHJcbiAgICAgICAgJChpdGVtc0ZpeGVkW2l0ZW1PZmZzZXQuaW5kZXhdKS5hZGRDbGFzcygndGl0bGVzX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICAkKGl0ZW1zU3RhdGljW2l0ZW1PZmZzZXQuaW5kZXhdKS5hZGRDbGFzcygndGl0bGVzX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgfSgpKTtcclxuICAgIH1cclxuICB9KTtcclxuICAvL9CS0YvQv9Cw0LTQsNGO0YnQuNC5INGB0LDQudC00LHQsNGAINCyINCx0LvQvtCz0LVcclxuICAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBtZW51Rml4ZWQgPSAkKFwiI2ZpeGVkXCIpLFxyXG4gICAgICAgIG1lbnVCdG4gPSBtZW51Rml4ZWQuZmluZCgnLnRpdGxlc19fYnRuJyksXHJcbiAgICAgICAgY2xpY2tBcmVhID0gJChcIiN0aXRsZXNDbGlja0FyZWFcIik7XHJcbiAgICBtZW51QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNsaWNrQXJlYS50b2dnbGVDbGFzcygndGl0bGVzLWNsaWNrLWFyZWEtLWFjdGl2ZScpO1xyXG4gICAgICBtZW51Rml4ZWQudG9nZ2xlQ2xhc3MoJ3RpdGxlcy0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuICAgIGNsaWNrQXJlYS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBjbGlja0FyZWEudG9nZ2xlQ2xhc3MoJ3RpdGxlcy1jbGljay1hcmVhLS1hY3RpdmUnKTtcclxuICAgICAgbWVudUZpeGVkLnRvZ2dsZUNsYXNzKCd0aXRsZXMtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfSgpKTtcclxufTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
