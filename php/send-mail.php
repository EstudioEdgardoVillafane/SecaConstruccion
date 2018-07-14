<?php
$Name = "matias";
$Email = "matiasbp7@hotmail.com";


date_default_timezone_set("America/Argentina/Buenos_Aires");
$time=time();
$fecha=date("Y-m-d",$time);
$hora= date("H:i",$time);
/**
 * @version 1.0
 */
require("class.phpmailer.php");
require("class.smtp.php");

// Valores enviados desde el formulario
/*if ( !isset($_POST["nombre"]) || !isset($_POST["email"]) || !isset($_POST["mensaje"]) ) {
    die ("Es necesario completar todos los datos del formulario");
}
$nombre = $_POST["nombre"];
$email = $_POST["email"];
$telefono = $_POST["telefono"];
$mensaje = $_POST["mensaje"];*/
// $nombre = "Edgardo";
// $email = "hourcadecristian@gmail.com";
$mensaje = "$fecha";

// Datos de la cuenta de correo utilizada para enviar vía SMTP
$smtpHost = "c1090159.ferozo.com";  // Dominio alternativo brindado en el email de alta 
// $smtpUsuario = "admin@seca.com.ar";  // Mi cuenta de correo se 
// $smtpClave = "xxx";  // Mi contraseñaMAtias!!!!
// Email donde se enviaran los datos cargados en el formulario de contacto

$emailDestino = "$Email";
$mail = new PHPMailer();
$mail->IsSMTP();
// $mail->SMTPAuth = true;
$mail->Port = 587; 
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";
$mail->Host = $smtpHost; 
// $mail->Username = $smtpUsuario; 
// $mail->Password = $smtpClave;
// $mail->From = $smtpUsuario; // Email desde donde envío el correo.
$mail->FromName = $Name;
$mail->AddAddress($emailDestino); // Esta es la dirección a donde enviamos los datos del formulario
$mail->AddReplyTo($Email); // Esto es para que al recibir el correo y poner Responder, lo haga a la cuenta del visitante. 
$mail->Subject = "Seca Construcciones - confirmacion de Cuenta"; // Este es el titulo del email.
$mensajeHtml = nl2br($mensaje);
$mail->Body = "sadsadassddasdasad"; // Texto del email en formato HTML
$mail->AltBody = "asdasasdasd ?????"; // Texto sin formato HTML
// FIN - VALORES A MODIFICAR //
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$estadoEnvio = $mail->Send(); 
if($estadoEnvio){
    echo "El correo fue enviado correctamente.";
} else {
    echo "no anda";
    echo $estadoEnvio;
}
?>