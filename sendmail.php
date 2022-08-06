<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer(true);
$mail -> Charset ="UTF-8";
$mail -> IsHTML(true);

$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
$mail->CharSet ='UTF-8';
$mail->setLanguage('ru','phpmailer/'); // add language
$mail->Host = 'ssl://smtp.mail.ru'; // settings of smtp from email
$mail->Username   = 'jane_lu@mail.ru'; // email Login
$mail->Password   = 'LazDk9XLuFrse7gjYFeQ'; // appPassword from email
$mail->Port = 465;//smtp port
//from
$mail->setFrom('jane_lu@mail.ru', 'Form mailer');
//for
$mail->addAddress('bu.asti@gmail.com', 'Yana Burdakova');

// subject
$mail->Subject = 'From the form on the Name.com';

$name = $_POST['name'];
$email = $_POST['email'];
$options = $_POST['choose'];
$dropdown = $_POST['dropdown'];
$message = $_POST['message'];
$file = $_FILES['image'];

$body = '<h2>The Name.com visiter has provided the following data </h2>';

if (trim(!empty($name))){
    $body.='<p><strong>Name:</strong>'.$name.'</p>';
}

if (trim(!empty($email))){
    $body.='<p><strong>Email:</strong>'.$email.'</p>';
}

if (trim(!empty($options))){
$body.='<p><strong>Choice from radio points:</strong>'.$options.'</p>';
}

if (trim(!empty($dropdown))){
    $body.='<p><strong>Choice from drop-down field:</strong>'.$dropdown.'</p>';
}

if (trim(!empty($message))){
    $body.='<p><strong>Message:</strong>'.$message.'</p>';
}

// Upload file
if(!empty($_FILES['image']['tmp_name'])){
    // way to upload - create the folder "files"
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
    if (copy($_FILES['image']['tmp_name'],$filePath)){
        $fileAttach = $filePath;
        $body.='<p><strong>Image from attachment:</strong></p>';
        $mail->addAttachment($fileAttach);
    }
}

$mail -> Body = $body;

if(!$mail->send()){
    $message = 'Error';
} else {
    $message = 'Successful send';
}

$response = ['message' => $message];

header('Content-type:application/json');
echo json_encode($response);
?>