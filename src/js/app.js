$(document).ready(function() {
  
  $(function() {
    var imgs = [],
        percents = 1;

    $('*').each(function() {
      var $this = $(this),
          img = $this.is('img'),
          background = $this.css('background-image');

      if (background != 'none') {
        var path = background.replace('url("','').replace('")','');
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

  $('.anchor-link').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body, html').animate({
      scrollTop: top
    }, 1500);
  })

});

window.onload = function() {
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
      e.preventDefault();
      menu.classList.toggle("menu--active");
      hamburger.classList.toggle("hamburger--transformed")
    }
  }
}