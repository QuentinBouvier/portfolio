<?php
session_start();
unset($_SESSION['phpGame']);

$_SESSION['phpGame'] = array(
        "gameName" => $_POST['gameName'],
        "axis" => array(
            "x" => $_POST['width'],
            "y" => $_POST['width'],
        ),
    );
$_SESSION['score'] = 0;
$_SESSION['playerPos']['x'] = 1;
$_SESSION['playerPos']['y'] = 1;
header('Location: ../index.php');
