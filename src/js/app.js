window.onload = function() {
  var card = document.getElementsByClassName("person-card")[0],
      form = document.getElementsByClassName("login-form")[0],
      authBtn = document.getElementsByClassName("authorization-btn")[0];
  authBtn.onclick = function() {
    card.style = "transform: rotateY(-270deg)";
    form.style = "transform: rotateY(0deg)";
  }
}