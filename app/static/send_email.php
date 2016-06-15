<?php
date_default_timezone_set('America/Sao_Paulo');
//header('Access-Control-Allow-Origin: *');

// get database connection
include __DIR__ . '/config/database.php';
include __DIR__ . '/objects/news.php';

$message = '<!DOCTYPE html><html><head>';
$message .= '<title>Luxore</title>';
$message .= "<link href='https://fonts.googleapis.com/css?family=Poiret+One' rel='stylesheet' type='text/css'>";
$message .= '<style type="text/css">body{color: #6d2a87;}.social{display: table;margin: 0 auto;}.social ul{padding: 0px;margin: 16px 0 0 0;text-align:center;}.social ul li{display: inline;}.social ul li a{display: inline-block;margin: 5px;text-align: center;}.social img{width: 35px;}.newsletter{background-color: rgba(255, 255, 255, 0.8);padding: 25px 0;max-width: 800px;margin: 0 auto;border-radius: 20px 20px;text-align: center;box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);}h1{font-size: 38px;line-height: 52px;font-weight: 700;font-style: normal;font-family: "Poiret One", cursive;letter-spacing: 2.5px;margin: 0 auto;position: relative;text-align: center;text-transform: uppercase;}h2{font-size: 30px;line-height: 36px;font-weight: 400;font-style: normal;font-family: "Poiret One", cursive;margin: 0 auto;position: relative;text-align: center;}.banner{margin-top: 20px;background-image: url("http://www.luxore.me/img/email/polygon-back.png");padding: 40px 0;background-size: cover;}.banner h1{color: #f3f2f3;text-transform: none;}.content{padding: 40px 0;max-width: 400px;margin: 0 auto;text-align: center;font-weight: 400;font-size: 24px;}.disclaimer{font-weight: 400;font-size: 16px;color: #777;}.copyright{font-weight: 600;font-size: 18px;}</style>';
$message .= '</head><body>';
$message .= '<section class="newsletter">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <img src="http://www.luxore.me/img/logo-purple.png" style="width: 144px;">
                </div>
                <div class="col s12">
                    <h1>LUXORE</h1>
                </div>
                <div class="col s12">
                    <h2>Foundation</h2>
                </div>
            </div>
            <div class="row banner">
                <div class="col s12">
                    <h1 class="title">{{TITLE}}</h1>
                </div>
            </div>
            <div class="row content">
                <div class="col s12">
                    <div class="col s6">
                        {{CONTENT}}
                    </div>
                </div>
            </div>
            <div class="contact">
                <div class="row">
                    <div class="col s12 disclaimer">
                        {{DISCLAIMER}}
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div class="col s12 social">
                            <ul>
                              <li><a href="https://www.facebook.com/luxoreapp/" class="btn-luxore btn-large" target="_blank"><img src="http://www.luxore.me/img/email/facebook.png"></i></a></li>
                              <li><a href="https://twitter.com/luxoreapp" class="btn-luxore btn-large" target="_blank"><img src="http://www.luxore.me/img/email/twitter.png"></i></a></li>
                              <li><a href="https://www.instagram.com/luxoreapp/" class="btn-luxore btn-large" target="_blank"><img src="http://www.luxore.me/img/email/instagram.png"></i></a></li>
                              <li><a href="https://www.youtube.com/channel/UCbxAgjYJIGXZTlTXkeeYuzw" class="btn-luxore btn-large" target="_blank"><img src="http://www.luxore.me/img/email/youtube.png"></i></a></li>
                            </ul>
                          </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 copyright">
                        {{COPYRIGHT}}
                    </div>
                </div>
            </div>
        </div>  
    </section>
</body></html>';

$params = json_decode(file_get_contents('php://input'),true);

if (isset($params['contact'])) 
{
    if (isset($params['subscribe']) && $params['subscribe'] == true)
    {
        addToNewsletter($params['email']);
    }

    $sub = "Luxore's Contact Form: " . $params['subject'];
    if(sendEmail($params['email'], 'whatsup@luxore.me', $params['email'], $params['name'], $sub, $params['message']))
    {
        $inputMessage = 'Thank you for contacting us. We will respond as soon as possible and we hope our interaction can solve your problems!';
        $msg = $message;
        $sub = "Luxore Foundation Contact";
        $name = explode(" ", $params['name']);
        $msg = str_replace("{{TITLE}}","Hi, " . $name[0], $msg);
        $msg = str_replace("{{CONTENT}}", $inputMessage, $msg);
        $msg = str_replace("{{DISCLAIMER}}","<p>In case of any doubt, feel free to contact us: whatsup@luxore.me</p>", $msg);
        $msg = str_replace("{{COPYRIGHT}}","Luxore " . date('Y'), $msg);

        $data = array('success' => true, 'message' => 'trying to send response.');
        if(sendEmail('whatsup@luxore.me', $params['email'], 'whatsup@luxore.me', 'Luxore', $sub, $msg, true))
        {
            $data['message'] = 'Thanks! We have received your message.';
        }
        else
        {
            $data['message'] = 'could not send response.';
        }

        echo json_encode($data);
        exit;
    }
    else
    {
        $data = array('error' => false, 'message' => 'Message could not be sent. Mailer Error');
        echo json_encode($data);
        exit;
    }
}
elseif (isset($params['newsletter'])) 
{
    if($user = addToNewsletter($params['email']))
    {
        $inputMessage = 'Thank you for subscribing to our newsletter!! Stay tuned for big news...';
        $msg = $message;
        $msg = str_replace("{{TITLE}}","Thanks!!!", $msg);
        $msg = str_replace("{{CONTENT}}", $inputMessage, $msg);
        //$_GET["token"] = hash_hmac('sha256', $email.$email_id, $site_salt);
        $link = "http://www.luxore.me/unsubscribe.php?id=$user->id&hs=".md5($user->email.$user->SECRET_STRING);
        $msg = str_replace("{{DISCLAIMER}}","<p>In case of any doubt, feel free to contact us: whatsup@luxore.me</p><p>to unsubscribe click <a href=\"\">here</a></p>", $msg);
        $msg = str_replace("{{COPYRIGHT}}","Luxore " . date('Y'), $msg);

        $sub = "Luxore's Newsletter Subscription";
        if(sendEmail('admin@luxore.me', $params['email'], 'whatsup@luxore.me', 'Luxore', $sub, $msg, true))
        {
            $data = array('success' => true, 'message' => 'Thanks! You are officily subscribed to our newsletter.');
            echo json_encode($data);
            exit;
        }
    }
    else
    {
        $data = array('success' => false, 'message' => 'Something went wrong... Maybe you are already subscribed');
        echo json_encode($data);
        exit;
    }

}
else
{
    $data = array('success' => false, 'message' => 'Command not recognized.');
    echo json_encode($data);
}

function addToNewsletter($mail)
{
    $database = new Database();
    $db = $database->getConnection();

    // instantiate people object
    $news = new News($db);

    $news->readOne($mail);
    if(!$news->id)
    {
        $news->email = $mail;
        $news->created_at = date('Y-m-d h:i:s');
        $news->create();
        return $news;
    }
    elseif ($news->active != 'ATV') {
        # code...
    }
    else
    {
        return null;
    }
}

function sendEmail($from, $to, $reply, $name, $subject, $message, $html = false)
{
    //check if any of the inputs are empty
    if (empty($to) || empty($subject) || empty($message) || empty($name)) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    $name='=?UTF-8?B?'.base64_encode($name).'?=';
    $subject='=?UTF-8?B?'.base64_encode($subject).'?=';
    $headers="From: $name <$from>\r\n".
        "Reply-To: <$reply>\r\n".
        "MIME-Version: 1.0\r\n";
    
    if(!$html)
        $headers .= "Content-Type: text/plain; charset=UTF-8";
    else
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    if(!mail($to,$subject,stripslashes($message),$headers))
    {
        return false;
    }

    return true;
}

?>