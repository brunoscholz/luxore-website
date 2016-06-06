<?php
header('Access-Control-Allow-Origin: *');
if (isset($_POST['email']) && isset($_POST['subject'])) {

    //check if any of the inputs are empty
    if (empty($_POST['email'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    $inputMessage = 'Thank you for subscribing to our newsletter!! Stay tuned for big news...';

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->From = 'admin@luxore.me';
    $mail->FromName = $_POST['Newsletter'];
    $mail->AddAddress($_POST['email']); //recipient
    $mail->Subject = $_POST['subject'];
    $mail->Body = "Message: " . stripslashes($inputMessage);

    $mail->isSMTP();
    $mail->Host = gethostbyname('dallas143.arvixeshared.com');\
    $mail->Port = 465;
    $mail->SMTPSecure = "tls";
    $mail->SMTPAuth = true;
    $mail->Username = "admin@luxore.me";
    $mail->Password = "Oeka8LIK";
    $mail->setFrom('admin@luxore.me', 'Newsletter Form');


    if(!$mail->send()) {
        $data = array('error' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

    // get database connection
    include_once __DIR__ . 'config/database.php';
    $database = new Database();
    $db = $database->getConnection();

    // instantiate people object
    include_once __DIR__ . 'objects/news.php';
    $news = new News($db);
    $news->$email = $_POST['email'];
    $news->$created_at = date('Y-m-d h:i:s');

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}
?>