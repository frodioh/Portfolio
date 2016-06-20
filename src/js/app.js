window.onload = function() {
  var card, form, authBtn, hamburger, menu;
  if (document.getElementsByClassName("person-card")[0] !== undefined) {
    card = document.getElementsByClassName("person-card")[0];
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

  if (authBtn !== undefined) {
    authBtn.onclick = function() {
    card.style = "transform: rotateY(-270deg)";
    form.style = "transform: rotateY(0deg)";
    }
  }
  hamburger.onclick = function() {
    menu.classList.add("menu--active");
  }
}