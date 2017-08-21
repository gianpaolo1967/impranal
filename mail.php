<?php

function recarray($item) 
	{	
		$srh = array('consulting-', 'entrepreneurs-', 'name', 'phone', 'email', 'type', 'color', 'capacity', 'qty', 'total', 'economy', 'summary');
		$rpl = array(null, null, 'Им`я:&nbsp;&nbsp;&nbsp;&nbsp;', 'Тел:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 'Email:&nbsp;&nbsp;&nbsp;', 'Лак: ', 'Відтінок: ', 'Упаковка: ', 'Кількість: ',"<br>" . 'Сума:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 'Зніжка:&nbsp;&nbsp;', 'Усього:&nbsp;&nbsp;');
		
		$msg .="<tr>";
		while ($curField1 = each($item)) 
		{
			if (is_array($curField1[1]))
			{ 
				//$msg .="<br>";
				$msg .= recarray($curField1[1]);
			}
			else
			{
				//$msg .= str_replace($srh, $rpl, $curField1[0]) . $curField1[1] . '; ';
				$msg .= '<td><p style="margin: 3px 20px" align="center">' . $curField1[1] . '</p></td>';
			}
		}
		$msg .="</tr>";
		unset ($srh);
		unset ($rpl);
		return $msg;
	}

// Сообщение
		$tHead = array('Лак','Відтінок','Упаковка','Кількість');
		$srh = array('consulting-', 'entrepreneurs-', 'name', 'phone', 'email', 'type', 'color', 'capacity', 'qty', 'total', 'economy', 'summary');
		$rpl = array(null, null, 'Им`я:&nbsp;&nbsp;&nbsp;&nbsp;', 'Тел:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 'Email:&nbsp;&nbsp;&nbsp;', 'Лак: ', 'Відтінок: ', 'Упаковка: ', 'Кількість: ',"<br>" . 'Сума:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 'Зніжка:&nbsp;&nbsp;', 'Усього:&nbsp;&nbsp;');
	//$message = 'FormRequest' . "<br>";

	while ($curField = each($_POST)) 
	{
		if ($curField[1] == '')
		{
			switch ($curField[0])
			{
				case 'consulting':
					$subject = 'Замовлення консультації';
					break;
				case 'entrepreneurs':
					$subject = 'Запит на співпрацію';
					break;
			}
		}

		if (is_array($curField[1]))
		{
			$subject = 'Замовлення товару';
			$message .= '<br>Кошик:<br>';
			$message .= '<table style="position: absolute; left: 50px"><thead><tr>';
			for ($i = 0; $i < 4; $i++)
			{
				$message .= '<th><p style="margin: 3px 20px">' . $tHead[$i] . '</p></th>';
			}
			$message .= '</tr></thead>';
			$message .= '<tbody>';
			$message .= recarray($curField[1]);
			$message .= '</tbody>';
			$message .= '</p>';
		}
		else
		{
			if ($curField[1] !== '')
			{
				$message .= str_replace($srh, $rpl, $curField[0]) . $curField[1] . "<br>";
			}
		}
	}

// На случай если какая-то строка письма длиннее 70 символов используем wordwrap()
//$message = wordwrap($message, 70, "<br>");

$headers = 'From: Laki Dereva <service@lakidereva.com.ua>' . "\r\n" . 
		   //'Reply-To: impranal.lak@gmail.com' . "\r\n" . 
		   'X-Mailer: PHP/' . phpversion() . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

unset ($rpl);
unset ($srh);
unset ($tHead);
// Отправка
		return mail('budnavigator@gmail.com', $subject, $message, $headers);
?>
