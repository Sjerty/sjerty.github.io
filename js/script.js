$(document).ready(function() { /*Когда сайт загружен, запустить функцию*/

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