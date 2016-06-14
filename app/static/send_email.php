<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('America/Sao_Paulo');

$params = json_decode(file_get_contents('php://input'),true);
if (isset($params['email'])) {

    //check if any of the inputs are empty
    if (empty($params['email'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    $inputMessage = 'Thank you for subscribing to our newsletter!! Stay tuned for big news...';

    //create an instance of PHPMailer
    /*$mail = new PHPMailer();

    $mail->From = 'admin@luxore.me';
    $mail->FromName = $params['Newsletter'];
    $mail->AddAddress($params['email']); //recipient
    $mail->Subject = $params['subject'];
    $mail->Body = "Message: " . stripslashes($inputMessage);

    $mail->isSMTP();
    $mail->Host = gethostbyname('dallas143.arvixeshared.com');\
    $mail->Port = 465;
    $mail->SMTPSecure = "tls";
    $mail->SMTPAuth = true;
    $mail->Username = "admin@luxore.me";
    $mail->Password = "Oeka8LIK";
    $mail->setFrom('admin@luxore.me', 'Newsletter Form');*/

    $name='=?UTF-8?B?'.base64_encode('Luxore').'?=';
    $subject='=?UTF-8?B?'.base64_encode("Luxore's Newsletter Subscription").'?=';
    $headers="From: $name <{admin@luxore.me}>\r\n".
        "Reply-To: {newsletter@luxore.me}\r\n".
        "MIME-Version: 1.0\r\n".
        "Content-Type: text/plain; charset=UTF-8";

    if(!mail($params['email'],$subject,stripslashes($inputMessage),$headers))
    {
        $data = array('error' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    /*if(!$mail->send()) {
        $data = array('error' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }*/

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

    // get database connection
    include __DIR__ . '/config/database.php';
    $database = new Database();
    $db = $database->getConnection();

    // instantiate people object
    include __DIR__ . '/objects/news.php';
    $news = new News($db);
    $news->email = $params['email'];
    $news->created_at = date('Y-m-d h:i:s');
    $news->create();

} else {
    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);
}

?>