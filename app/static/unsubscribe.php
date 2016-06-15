<?php
date_default_timezone_set('America/Sao_Paulo');
//header('Access-Control-Allow-Origin: *');

// get database connection
include __DIR__ . '/config/database.php';
include __DIR__ . '/objects/news.php';

if(isset($_GET['hs']) && !empty($_GET['hs']))
{
	$database = new Database();
    $db = $database->getConnection();

    // instantiate people object
    $news = new News($db);
    $news->readOne($_GET['íd']);

    if(!$news->id)
    {
        echo 'user not found';
        exit;
    }
    elseif ($news->active != 'ATV')
    {
        echo 'echo user not active';
        exit;
    }

    $news.unsubscribe($_GET['hs']);
}

?>