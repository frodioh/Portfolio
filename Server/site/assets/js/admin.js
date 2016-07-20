window.onload = function() {
  var skillsBtn = document.getElementById("skillsBtn");
  var blogBtn = document.getElementById("blogBtn");
  var workForm = document.getElementById("workForm");
  var modalBtn = document.getElementById("modalBtn");
  var area = document.querySelector(".admin-block-area");
  var modal = document.querySelector(".admin-modal");
  var modalText = document.querySelector(".admin-modal__text");
  function clearModal() {
    modalText.innerHTML = "Сообщение отправлено";
  }
  skillsBtn.addEventListener('click', function() {
    clearModal();
    var data = {
          "frontend": {
            "html": document.getElementById("html").value,
            "css": document.getElementById("css").value,
            "js": document.getElementById("js").value
          },
          "workflow": {
            "git": document.getElementById("git").value,
            "gulp": document.getElementById("gulp").value,
            "bower": document.getElementById("bower").value
          },
          "backend": {
            "php": document.getElementById("php").value,
            "nodejs": document.getElementById("nodejs").value,
            "mongodb": document.getElementById("mongodb").value
          }
        };
    $.ajax({
      type: 'POST',
      url: '/skills',
      contentType: 'application/json; charset=utf8',
      data: JSON.stringify(data),
      success: function(data){
        if(data.isValid===true) {
          area.classList.add("admin-block-area--active");
          modal.classList.add("admin-modal--active");
        }
        if(data.isValid===false) {
          area.classList.add("admin-block-area--active");
          modal.classList.add("admin-modal--active");
          modalText.innerHTML = "Ты чего, числа должны быть<br> от 0 до 100((("
        }
      }
    });
  });
  blogBtn.addEventListener('click', function() {
    clearModal();
    var data = {
          "title": document.getElementById("postTitle").value,
          "date": document.getElementById("postDate").value,
          "body": document.getElementById("postText").value
        };
    if((data.title!="")&&(data.body!="")) {
      $.ajax({
        type: 'POST',
        url: '/blog',
        contentType: 'application/json; charset=utf8',
        data: JSON.stringify(data),
        success: function(data){
          if(data.isValid===true) {
            area.classList.add("admin-block-area--active");
            modal.classList.add("admin-modal--active");
          }
          if(data.isValid===false) {
            area.classList.add("admin-block-area--active");
            modal.classList.add("admin-modal--active");
            modalText.innerHTML = "Дата неправильная((<br> Попробуй DD.MM.YYYY";
          }
        }
      });
    } else {
      area.classList.add("admin-block-area--active");
      modal.classList.add("admin-modal--active");
      modalText.innerHTML = "Посмотри-ка, поля ведь не заполнены";
    }
    
  });
  workForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearModal();
    var data = new FormData($('#workForm')[0]);
    console.log(data);
    $.ajax({
        url: './work',
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {
          if(data.isValid===true) {
            area.classList.add("admin-block-area--active");
            modal.classList.add("admin-modal--active");
            $('#workForm')[0].reset();
          }
          if(data.isValid===false) {
            area.classList.add("admin-block-area--active");
            modal.classList.add("admin-modal--active");
            modalText.innerHTML = "Похоже файл не смог загрузится(";
            $('#workForm')[0].reset();
          }
        }
    });
  });

  modalBtn.addEventListener('click', function() {
    clearModal();
    area.classList.remove("admin-block-area--active");
    modal.classList.remove("admin-modal--active");
  });

};