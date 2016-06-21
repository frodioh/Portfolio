window.onload = function() {
  var card, form, authBtn, hamburger, menu;
  if (document.getElementsByClassName("index-container")[0] !== undefined) {
    card = document.getElementsByClassName("index-container")[0];
  }
  if (document.getElementsByClassName("login-form")[0] !== undefined) {
    form = document.getElementsByClassName("login-form")[0];
  }
  if (document.getElementsByClassName("authorization-btn")[0] !== undefined) {
    authBtn = document.getElementsByClassName("authorization-btn")[0];
  }
  if (document.getElementsByClassName("hamburger")[0] !== undefined) {
    hamburger = document.getElementsByClassName("hamburger")[0];
  }
  if (document.getElementsByClassName("menu")[0] !== undefined) {
    menu = document.getElementsByClassName("menu")[0];
  }

  if (authBtn) {
    authBtn.onclick = function() {
      card.classList.toggle("index-container--flip");
    }
  }
  if (hamburger) {
      hamburger.onclick = function() {
      menu.classList.add("menu--active");
    }
  }
}