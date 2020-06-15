$(document).ready(function() { /*Когда сайт загружен, запустить функцию*/
$('#submit').attr('disabled', true);
var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
var mail = $("#mail");
    mail.blur(function(){
     if(mail.val() != ''){
         if(mail.val().search(pattern) == 0){
             $('#valid').text('Подходит');
             $('#valid').addClass('ok');
             $('#submit').attr('disabled', false);
             $('#submit').removeClass('disabled');
             mail.removeClass('error').addClass('ok');
         }else{
             $('#valid').removeClass('ok');
             $('#valid').text('Введите корректный e-mail');
             $('#submit').attr('disabled', true);
             $('#submit').addClass('disabled');
             mail.removeClass('ok').addClass('error');
         }
     }else{
         $('#valid').removeClass('ok');
         $('#valid').text('Поле e-mail не должно быть пустым!');
         mail.removeClass('ok').addClass('error');
         $('#submit').attr('disabled', true);
         $('#submit').addClass('disabled');
         }
    });    
    
	$("form").submit(function() {/*При клике на кнопке с типом "submit" вызов функции*/
		var th = $(this);/*Сохранения данного элемента в переменную для удобства*/
		$.ajax({ /*Ассинхронный запрос*/
			type: "POST",
			url: "mail.php", /*Обращение к файлу mail.php*/
			data: th.serialize() /*Возвращает строку, с именами и значениями выбранных элементов формы*/
		}).done(function() { /*По окончании отправки, вызов функции*/
			alert("Thank you!");/*Спасибо :D*/
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});