<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$subject = trim($_POST["Subject"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || $email === "" || $subject === "" || $message === "") {
    die("Please fill in all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Please enter a valid email address.");
}

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();

    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'YOUR-EMAIL@gmail.com';

    $mail->Password = 'YOUR_APP_PASSWORD_HERE';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom(
        'YOUR-EMAIL@gmail.com',
        'EL RAY Coffee'
    );

    $mail->addAddress(
        'YOUR-EMAIL@gmail.com'
    );

    $mail->addReplyTo(
        $email,
        $name
    );

    $mail->isHTML(false);

    $mail->Subject = $subject;

    $mail->Body =
        "Name: " . $name . "\n" .
        "Email: " . $email . "\n\n" .
        "Message:\n" . $message;

    $mail->send();

    echo "Message sent successfully!";

} catch (Exception $e) {

    echo "Message could not be sent: " . $mail->ErrorInfo;

}

?>