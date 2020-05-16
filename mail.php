<?php

$method = $_SERVER['REQUEST_METHOD']; /*Запрос метода отправки от формы*/

$c = true;
if ( $method === 'POST' ) { /*Если метод отправки POST*/

	$project_name = trim($_POST["project_name"]); /*Имя сайта с которого будет отпрвлено сообщение*/
	$admin_email  = trim($_POST["admin_email"]); /*Почта на которую отправляется сообщение*/
	$form_subject = trim($_POST["form_subject"]); /*Какая конкретно форма отправила сообщение*/

	foreach ( $_POST as $key => $value ) {/*Перебор полученных элементов формы*/
		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";/*Форматирование сообщения для отправки на почту*/
		}
	}
} else if ( $method === 'GET' ) {/*Если метод отправки GET*/

	$project_name = trim($_GET["project_name"]); /*Имя сайта с которого будет отпрвлено сообщение*/
	$admin_email  = trim($_GET["admin_email"]);/*Почта на которую отправляется сообщение*/
	$form_subject = trim($_GET["form_subject"]); /*Какая конкретно форма отправила сообщение*/

	foreach ( $_GET as $key => $value ) {/*Перебор полученных элементов формы*/
		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";/*Форматирование сообщения для отправки на почту*/
		}
	}
}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );
?>