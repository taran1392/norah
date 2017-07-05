$('.sign-in').click(function() {
    $('#myModal').modal('show');
});

firebase.auth().onAuthStateChanged(function(user) {
    // DISPLAY USER MAIL INFO
    if (user) {
        $('.user-mail').html(user.email);
    } else {
        if (window.location.search.replace('?', '') == 'reg') {
            $('.follow_icon button').click();
        }
    }

    if (user) {
        $('.sign-in').css('display', 'none');
        $('.log-Out').css('display', 'block');
    } else {
        $('.regB').css('display', 'block');
    }

    $('.fa-plus-circle, .fa-download').off('click').on('click', function() {
        if (!user) {
            window.location = "registration_form.html?reg";
        }

    });


    // console.log(user.email);





















    /*
      if (user && user.uid != currentUid) {  
        // Обноваляем UI когда новый пользователь логинится
        // В другом случае игнорируем если это обновление токена
        // Обновляем UID текущего пользователя 
       currentUid = uid;  
      } else {  
        // Операция выхода из приложения. Переустанавливает UID текущего пользователя
       currentUid = null;  
      }  */



    // End jQuery  <<<<<<<<<<<<<<<<<<<<<<<
});