<?php
session_start();
// check if there is an input
if (isset($_POST['direction'])) {
    // move the coordinate depending on the input and check if the playerPos
    // is inbound, prevents out of bound by anulating the effect of the input
    // UP: y = y - 1
    // DOWN: y = y + 1
    // RIGHT: x = x + 1
    // LEFT: x = x - 1
    if ($_POST['direction'] == 'up') {
        $_SESSION['playerPos']['y'] -= ($_SESSION['playerPos']['y'] == 1) ? 0 : 1;
    } elseif ($_POST['direction'] == 'right') {
        $_SESSION['playerPos']['x'] += ($_SESSION['playerPos']['x'] == $_SESSION['phpGame']['axis']['x']) ? 0 : 1;
    } elseif ($_POST['direction'] == 'left') {
        $_SESSION['playerPos']['x'] -= ($_SESSION['playerPos']['x'] == 1) ? 0 : 1;
    } elseif ($_POST['direction'] == 'down') {
        $_SESSION['playerPos']['y'] += ($_SESSION['playerPos']['y'] == $_SESSION['phpGame']['axis']['y']) ? 0 : 1;
    }
}


header('Location: ../game.php');
